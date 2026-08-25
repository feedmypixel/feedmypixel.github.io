import { execSync } from 'node:child_process'
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import { sveltekit } from '@sveltejs/kit/vite'

function buildShaFromGitOrCiEnv() {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim()
  } catch {
    return process.env.GITHUB_SHA?.slice(0, 7) ?? 'dev'
  }
}

export default defineConfig({
  plugins: [sveltekit()],

  define: {
    __BUILD_SHA__: JSON.stringify(buildShaFromGitOrCiEnv())
  },

  /* Stated rather than inherited, so the baseline survives the next Vite major.
     The site already relies on cascade layers, oklch and color-mix. */
  build: { target: 'baseline-widely-available' },

  test: {
    globals: true,
    passWithNoTests: true,
    expect: { requireAssertions: true },
    coverage: {
      include: ['src/**/*.{js,ts,svelte}'],
      exclude: [
        '.svelte-kit/**',
        'build/**',
        'coverage/**',
        'e2e/**',
        'playwright.config.ts',
        'playwright.visual.config.ts',
        'svelte.config.js',
        'vite.config.ts',
        'eslint.config.js',
        'src/app.d.ts',
        'src/test-setup.ts',
        '**/*.test.{js,ts}',
        '**/*.svelte.test.{js,ts}',
        'src/routes/**/+*.ts',
        'src/routes/**/+*.svelte'
      ],
      thresholds: { statements: 80, branches: 80, functions: 80, lines: 80 }
    },
    projects: [
      {
        extends: './vite.config.ts',
        test: {
          name: 'client',
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: 'chromium', headless: true }]
          },
          setupFiles: ['./src/test-setup.ts'],
          include: ['src/**/*.svelte.test.{js,ts}']
        }
      },
      {
        extends: './vite.config.ts',
        test: {
          name: 'server',
          environment: 'node',
          include: ['src/**/*.test.{js,ts}'],
          exclude: ['src/**/*.svelte.test.{js,ts}']
        }
      }
    ]
  }
})
