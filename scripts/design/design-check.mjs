import { spawn, spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { chromium } from 'playwright'
import { extractSpec } from './extract.mjs'
import { diffSpecs } from './diff.mjs'

const ROOT = join(import.meta.dirname, '../..')
const ELEMENT_MAP_PATH = 'design/status-v7/element-map.json'
const PREVIEW_PORT = 4173
const PREVIEW_URL = `http://localhost:${PREVIEW_PORT}`
const THEME_STORAGE_KEY = 'fmp-theme'
const DEFAULT_THEMES = ['light']

const elementMap = JSON.parse(readFileSync(join(ROOT, ELEMENT_MAP_PATH), 'utf8'))

const flags = new Set(process.argv.slice(2).filter((argument) => argument.startsWith('--')))
const requestedSurfaces = process.argv.slice(2).filter((argument) => !argument.startsWith('--'))
const reuseServer = flags.has('--reuse-server')
const mocksOnly = flags.has('--mocks-only')

const surfacesToRun = Object.entries(elementMap).filter(
  ([surfaceName]) => requestedSurfaces.length === 0 || requestedSurfaces.includes(surfaceName)
)

const elementsToSelectors = (elements, side) =>
  Object.fromEntries(
    Object.entries(elements).map(([name, config]) => [
      name,
      { selector: config[side], origin: config.origin?.[side] }
    ])
  )

const waitForServer = async (url) => {
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      await fetch(url)
      return
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }
  throw new Error(`preview server did not answer at ${url}`)
}

// Always builds fresh: a stale server on the port would measure an old bundle.
const bootApp = async () => {
  if (reuseServer) {
    return { baseUrl: PREVIEW_URL, stop: async () => {} }
  }
  const build = spawnSync('pnpm', ['build'], { cwd: ROOT, stdio: 'inherit' })
  if (build.status !== 0) {
    throw new Error('pnpm build failed')
  }
  const preview = spawn('pnpm', ['preview', '--port', String(PREVIEW_PORT), '--strictPort'], {
    cwd: ROOT,
    stdio: 'ignore',
    detached: true
  })
  const stop = async () => process.kill(-preview.pid)
  try {
    await waitForServer(PREVIEW_URL)
  } catch (error) {
    await stop()
    throw error
  }
  return { baseUrl: PREVIEW_URL, stop }
}

const newSeededPage = async (browser, { width, height, theme }) => {
  const context = await browser.newContext({
    viewport: { width, height },
    colorScheme: theme
  })
  await context.addInitScript(
    ([key, value]) => localStorage.setItem(key, value),
    [THEME_STORAGE_KEY, theme]
  )
  return context.newPage()
}

const showSlide = async (page, slide, side) => {
  if (!slide) {
    return
  }
  await page.locator(slide[side]).nth(slide.index).click()
  await page.waitForTimeout(slide.settleMs ?? 800)
}

const extractFromMock = async (browser, config, viewport, theme) => {
  const mockPage = await newSeededPage(browser, {
    width: config.mockViewportWidth ?? viewport,
    height: 1400,
    theme
  })
  await mockPage.goto(pathToFileURL(join(ROOT, config.mock)).href, {
    waitUntil: 'load',
    timeout: 60_000
  })
  await mockPage.waitForTimeout(config.mockSettleMs ?? 1_000)
  if (config.mockStyle) {
    await mockPage.addStyleTag({ content: config.mockStyle })
  }
  await showSlide(mockPage, config.slide, 'mock')
  const spec = await extractSpec(
    mockPage,
    elementsToSelectors(config.elements, 'mock'),
    config.mockFrame
  )
  await mockPage.context().close()
  return spec
}

const extractFromBuild = async (browser, config, viewport, theme, app) => {
  const builtPage = await newSeededPage(browser, {
    width: viewport,
    height: config.viewportHeight ?? 1000,
    theme
  })
  await builtPage.goto(`${app.baseUrl}${config.builtRoute}`, { waitUntil: 'networkidle' })
  await showSlide(builtPage, config.slide, 'built')
  const spec = await extractSpec(builtPage, elementsToSelectors(config.elements, 'built'), null)
  await builtPage.context().close()
  return spec
}

const runSurface = async (surfaceName, config, browser, app) => {
  const report = []
  for (const theme of config.themes ?? DEFAULT_THEMES) {
    for (const viewport of config.viewports) {
      const mockSpec = await extractFromMock(browser, config, viewport, theme)
      const builtSpec = await extractFromBuild(browser, config, viewport, theme, app)
      const { defects, waived } = diffSpecs(mockSpec, builtSpec, config.elements)
      report.push({ label: `${surfaceName} @ ${viewport} ${theme}`, defects, waived })
    }
  }
  return report
}

const printMockSpecs = async (browser) => {
  for (const [surfaceName, config] of surfacesToRun) {
    for (const theme of config.themes ?? DEFAULT_THEMES) {
      for (const viewport of config.viewports) {
        const spec = await extractFromMock(browser, config, viewport, theme)
        console.log(JSON.stringify({ surface: surfaceName, viewport, theme, spec }, null, 2))
      }
    }
  }
}

const main = async () => {
  const browser = await chromium.launch()
  if (mocksOnly) {
    try {
      await printMockSpecs(browser)
    } finally {
      await browser.close()
    }
    return
  }

  const app = await bootApp()
  let totalDefects = 0

  try {
    for (const [surfaceName, config] of surfacesToRun) {
      const results = await runSurface(surfaceName, config, browser, app)
      const gating = config.gate !== false
      for (const { label, defects, waived } of results) {
        console.log(`\n=== ${label} ===`)
        if (!gating) {
          console.log(`NOT GATING — ${config.gateNote ?? 'reported only'}`)
        }
        if (waived.length > 0) {
          console.log(`waived (${waived.length}):`)
          for (const line of waived) {
            console.log(`  ${line}`)
          }
        }
        if (defects.length === 0) {
          console.log('0 defects')
          continue
        }
        console.log(`${defects.length} defects:`)
        for (const line of defects) {
          console.log(`  ${line}`)
        }
        if (gating) {
          totalDefects += defects.length
        }
      }
    }
  } finally {
    await browser.close()
    await app.stop()
  }

  if (totalDefects > 0) {
    console.log(`\ndesign:check FAILED — ${totalDefects} unwaived defects`)
    process.exit(1)
  }
  console.log('\ndesign:check passed — 0 defects')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
