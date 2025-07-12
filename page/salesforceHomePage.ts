import { BrowserContext, Page } from "@playwright/test";
import { selectors } from "../constants/selectors";
import { PlaywrightWrapper } from "../core/PlaywrightWrapper";

export class SalesforceHomePage extends PlaywrightWrapper {
    constructor(page: Page, context: BrowserContext) {
        super({ page, context });
    }

    /**
     * Clicks on the App Launcher icon.
     */
    public async appLauncher(): Promise<void> {
        await this.waitForElementVisible(selectors.applauncherIcon, "App Launcher");
        await this.click(selectors.applauncherIcon, "App Launcher", "Button");
    }

    /**
     * Clicks on the "View All" button inside the App Launcher.
     */
    public async viewAll(): Promise<void> {
        await this.waitSelector(selectors.viewAllBtn);
        await this.page.locator(selectors.viewAllBtn).highlight();
        await this.click(selectors.viewAllBtn, "View All", "Button");
    }

    /**
     * Enters text in the app search field.
     * @param value - The app name to search for.
     */
    public async searchApp(value: string): Promise<void> {
        await this.wait('mediumWait');
        await this.fill(selectors.appItemSearchField, "Search Field", value);
    }

    /**
     * Clicks on the app or item based on the given name.
     * @param data - The name of the app or item to select.
     */
    public async app(data: string): Promise<void> {
        await this.click(selectors.appOrItem(data), data, "Button");
    }
}
