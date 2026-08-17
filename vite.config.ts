import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import { sveltekit } from '@sveltejs/kit/vite'

export default defineConfig({
  plugins: [sveltekit()],
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
        '**/*.test.{js,ts}',
        '**/*.svelte.test.{js,ts}',
        'src/routes/**/+*.ts',
        'src/routes/**/+*.svelte'
      ],
      thresholds: { statements: 80, branches: 75, functions: 80, lines: 80 }
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
