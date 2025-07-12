import { Page, BrowserContext } from '@playwright/test';

export interface IPlaywrightContext {
  context: BrowserContext;
  page: Page;
}
