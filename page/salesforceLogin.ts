import { BrowserContext, Page, expect } from "@playwright/test";
import { PlaywrightWrapper } from "../core/PlaywrightWrapper";
import { selectors } from "../constants/selectors";
import { URLConstants } from "../constants/urlConstants"

export class SalesforceLoginPage extends PlaywrightWrapper {
    constructor(page: Page, context: BrowserContext) {
        super({ page, context });
    }

    /**
     * Logs into Salesforce based on user role
     */
    public async salesforceLogin(username: string, password: string) {
        await this.goTo(URLConstants.adminURL);
        const pageTitle = await this.page.title();
        if (pageTitle.startsWith("Login")) {
            await this.fill(selectors.username, "Username", username);
            await this.fill(selectors.password, "Password", password);
            await this.click(selectors.loginBtn, "Login", "Button");
            await this.wait('mediumWait');
            await this.waitForElementVisible(selectors.applauncherIcon, "App Launcher");
        } else {
            console.log("✅ Login skipped — already logged in or session preserved.");
        }
    }

    /**
     * Verifies if the Home label is visible and correct
     */
    public async verifyHomeLabel() {
        await this.waitForElementVisible(selectors.homeLabel, "Home Button");
        const homeText = await this.getText(selectors.homeLabel);
        expect(homeText).toContain("Home");
    }
}
