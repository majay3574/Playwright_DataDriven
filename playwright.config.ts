import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config({ debug: false });

// Dynamic timestamped HTML report folder
const timestamp = Date.now();
const reportDir = `./reporter/playwright-reports-${timestamp}`;

// Env-based browser selection
const browser = process.env.BROWSER || 'chrome';
import type { Project } from '@playwright/test';

const projects: Project[] = [];

// Conditional browser config
if (browser === 'chrome') {
  projects.push({
    name: 'chrome',
    use: {
      browserName: 'chromium',
      channel: 'chrome',
      headless: false,
      viewport: null,
      launchOptions: {
        args: [
          "--start-maximized",
          "--disable-web-security",
          "--disable-features=IsolateOrigins,site-per-process",
          "--no-proxy-server"
        ]
      }
    }
  });
} if (browser === 'msedge') {
  projects.push({
    name: 'msedge',
    use: {
      browserName: 'chromium',
      channel: 'msedge',
      headless: false,
      viewport: null,
      launchOptions: {
        args: [
          "--start-maximized",
          "--disable-web-security",
          "--disable-features=IsolateOrigins,site-per-process",
          "--no-proxy-server"
        ]
      }
    }
  });
}

if (browser === 'firefox') {
  projects.push({
    name: 'firefox',
    use: {
      ...devices['Desktop Firefox'],
      launchOptions: {
        args: ['--kiosk']
      }
    }
  });
}

if (browser === 'webkit') {
  projects.push({
    name: 'webkit',
    use: {
      ...devices['Desktop Safari'],
      viewport: { width: 1280, height: 680 }
    }
  });
}

if (browser === 'mobile') {
  projects.push({
    name: 'Mobile Safari',
    use: {
      ...devices['Pixel 2 landscape'],
    }
  });
}

export default defineConfig({
  testDir: './tests',
  timeout: process.env.TIMEOUT ? Number(process.env.TIMEOUT) : 55 * 10000,
  fullyParallel: true,
  retries: process.env.RETRIES ? Number(process.env.RETRIES) : 0,
  workers: process.env.WORKERS ? Number(process.env.WORKERS) : 1,
  repeatEach: process.env.REPEATEACH ? Number(process.env.REPEATEACH) : 0,

  expect: {
    timeout: process.env.EXPECTTIMEOUT ? Number(process.env.EXPECTTIMEOUT) : 15000
  },

  reporter: [
    ['html', { outputFolder: reportDir, open: 'always' }],
    ['allure-playwright'],
  ],

  use: {
    actionTimeout: process.env.ACTIONTIMEOUT ? Number(process.env.ACTIONTIMEOUT) : 10000,
    headless: process.env.HEADLESS ? process.env.HEADLESS === 'true' : true,
    trace: (process.env.TRACE === 'on' || process.env.TRACE === 'off' || process.env.TRACE === 'retain-on-failure' || process.env.TRACE === 'on-first-retry')
      ? process.env.TRACE as 'on' | 'off' | 'retain-on-failure' | 'on-first-retry'
      : 'on',
    screenshot: (process.env.SCREENSHOT === 'on' || process.env.SCREENSHOT === 'off' || process.env.SCREENSHOT === 'only-on-failure')
      ? process.env.SCREENSHOT as 'on' | 'off' | 'only-on-failure'
      : 'on',
    video: (process.env.VIDEO === 'on' || process.env.VIDEO === 'off' || process.env.VIDEO === 'retain-on-failure' || process.env.VIDEO === 'on-first-retry')
      ? process.env.VIDEO as 'on' | 'off' | 'retain-on-failure' | 'on-first-retry'
      : 'on',
    ignoreHTTPSErrors: true,
    bypassCSP: true,
  },

  projects,
});
