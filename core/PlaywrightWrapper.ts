import { Page, BrowserContext, test, expect } from '@playwright/test';
import { IPlaywrightContext } from './IPlaywrightContext.ts';

export class PlaywrightWrapper implements IPlaywrightContext {

    context: BrowserContext;
    page: Page;

    constructor(playwrightCtx: IPlaywrightContext) {

        this.context = playwrightCtx.context;
        this.page = playwrightCtx.page;
    }

    protected async goTo(url: string): Promise<void> {
        await test.step(`Navigate to the page URL: ${url}`, async () => {
            try {
                await this.page.goto(url);
                await this.waitUntilPageLoads();
            } catch (error) {
                console.error(`Failed to navigate to ${url}`, error);
                throw error;
            }
        });
    }

    /**
     * Clicks on the specified textbox element.
     * @param {string} locator - The locator for the element.
     * @param {string} name - The name of the element.
     * @param {string} type - The type of the element
     */

    protected async click(locator: string, name: string, type: string) {
        await test.step(`The ${name} ${type} clicked`, async () => {
            await this.page.waitForSelector(locator, { state: 'visible' });
            await this.page.locator(locator).click();
        });
    }

    /**
  * Types into the specified textbox after clearing any existing text.
  * 
  * @param {string} locator - The locator for the textbox element.
  * @param {string} name - The name of the textbox element.
  * @param {string} data - The data to be typed into the textbox.
  */
    protected async fill(locator: string, name: string, data: string) {
        await test.step(`Textbox ${name} filled with data: ${data}`, async () => {
            await this.page.waitForSelector(locator, { state: 'visible' });
            await this.page.locator(locator).clear();
            await this.page.locator(locator).fill(data);
        }

        )
    }

    /**
     * Types into the specified textbox, clears existing text, and presses <ENTER>.
     * @param {string} locator - The locator for the textbox element.
     * @param {string} name - The name of the textbox element.
     * @param {string} data - The data to be typed into the textbox.
     */
    protected async fillAndEnter(locator: string, name: string, data: string) {
        await test.step(`Textbox ${name} filled with data: ${data}`, async () => {
            await this.page.locator(locator).clear();
            await this.page.fill(locator, data, { force: true })
            await this.page.focus(locator)
            await this.page.keyboard.press("Enter");

        });
    }

    /**
    * Types the specified data into a textbox using keyboard input, after clearing existing text.
    * @param {string} locator - The locator for the textbox element.
    * @param {string} data - The data to be typed into the textbox.
  */
    protected async keyboardType(locator: string, data: string) {
        await test.step(`Textbox filled with data: ${data}`, async () => {
            await this.page.locator(locator).clear();
            await this.page.focus(locator);
            await this.page.keyboard.type(data, { delay: 100 });
        });
    }

    /**
    * Types the specified data into a textbox and presses <Enter> after clearing the existing text.
    * @param {string} locator - The locator for the textbox element.
    * @param {string} name - The name of the textbox element.
    * @param {string} data - The data to be typed into the textbox.
    */
    protected async typeAndEnter(locator: string, name: string, data: string) {
        await test.step(`Textbox ${name} filled with data: ${data}`, async () => {
            await this.page.locator(locator).clear();
            await this.page.keyboard.type(data, { delay: 400 });
            await this.page.keyboard.press("Enter");
        });
    }

    /**
 * Retrieves the visible inner text of a given selector on the page.
 * Throws an error if no text is found.
 *
 * @param selector - The CSS or XPath selector of the element to extract text from
 * @returns A promise that resolves to the extracted text
 */
    protected async getText(selector: string): Promise<string> {
        return await test.step(`Get text from: ${selector}`, async () => {
            try {
                const text = await this.page.innerText(selector);
                if (text === null) {
                    throw new Error(`No text found for selector: ${selector}`);
                }
                console.log(`Text from ${selector}: "${text}"`);
                return text;
            } catch (error) {
                console.error(`Failed to get text from ${selector}`, error);
                throw error;
            }
        });
    }


    /**
 * Waits until the specified element becomes visible on the page.
 *
 * @param selector - The selector of the element to wait for
 * @param name - A human-readable name for the element (used in logs and reports)
 * @returns A promise that resolves when the element is visible
 */
    protected async waitForElementVisible(selector: string, name: string): Promise<void> {
        await test.step(`Wait for element visible: ${name}`, async () => {
            try {
                await this.page.waitForSelector(selector, { state: 'visible', timeout: 20000 });
                console.log(`Element "${name}" is visible`);
            } catch (error) {
                console.error(`Element "${name}" not visible`, error);
                throw error;
            }
        });
    }

    /**
     * Waits until the specified element becomes hidden on the page.
     *
     * @param selector - The selector of the element to wait for
     * @param name - A human-readable name for the element (used in logs and reports)
     * @returns A promise that resolves when the element is hidden
     */
    protected async waitForElementHidden(selector: string, name: string): Promise<void> {
        await test.step(`Wait for element hidden: ${name}`, async () => {
            try {
                await this.page.waitForSelector(selector, { state: 'hidden', timeout: 20000 });
                console.log(`Element "${name}" is hidden`);
            } catch (error) {
                console.error(`Element "${name}" is still visible`, error);
                throw error;
            }
        });
    }

    /**
     * Waits for the page to finish loading completely.
     *
     * @returns A promise that resolves once the page's load state is 'load'
     */
    protected async waitUntilPageLoads(): Promise<void> {
        await test.step(`Wait for page load`, async () => {
            try {
                console.log(`Waiting for page to load completely`);
                await this.page.waitForLoadState('load');
            } catch (error) {
                console.error(`Page did not load completely`, error);
                throw error;
            }
        });
    }

    /**
    * Waits for a specified duration based on the wait type provided.
    * 
    * @param {'minWait' | 'mediumWait' | 'maxWait'} waitType - The type of wait duration ('minWait', 'mediumWait', or 'maxWait').
    */
    protected async wait(waitType: 'minWait' | 'mediumWait' | 'maxWait') {
        try {
            switch (waitType) {
                case 'minWait':
                    await this.page.waitForTimeout(3000);
                    break;
                case 'mediumWait':
                    await this.page.waitForTimeout(5000);
                    break;
                case 'maxWait':
                    await this.page.waitForTimeout(10000);
                    break;
                default:
                    console.log("Invalid wait type provided.");
                    throw new Error(`Invalid wait type: ${waitType}`);
            }
        } catch (error) {
            console.error("Error during wait:", error);
        }
    }

    /**
    * Waits for a specific element to be attached to the DOM.
    * 
    * @param {string} locator - The locator for the element to wait for.
    * @param {string} name - A descriptive name for the element (not used in this function but could be useful for logging).
    */
    protected async waitSelector(locator: string, name?: string | "Element") {
        await test.step(`Waiting for ${name} Visible`, async () => {
            await this.page.waitForSelector(locator, { timeout: 30000, state: "attached" });
        })
    }

    /**
 * Verifies that the actual text matches the expected text exactly.
 * Wrapped in a test step for detailed reporting in Playwright.
 *
 * @param actual - The actual text retrieved from the UI or page
 * @param expected - The expected text to compare against
 */
    protected async verifyExactTextMatched(actual: string, expected: string): Promise<void> {
        await test.step(`Verify that actual text "${actual}" matches expected text "${expected}"`, async () => {
            try {
                console.log(`🔍 Comparing actual: "${actual}" vs expected: "${expected}"`);

                if (actual.trim() !== expected.trim()) {
                    throw new Error(
                        ` Text mismatch\nExpected: "${expected}"\nActual: "${actual}"`
                    );
                }
                console.log(`Text match successful`);
            } catch (error) {
                console.error(`Text verification failed`, error);
                throw error;
            }
        });
    }

    /**
 * Waits for the loading spinner to disappear from the page.
 * Uses an XPath locator to identify the spinner and expects its count to be zero.
 *
 * @returns A promise that resolves once the spinner is no longer present
 */
    public async spinnerDisappear(): Promise<void> {
        await this.wait('minWait');
        const spinner = this.page.locator("//div[@class='slds-spinner_container slds-grid']");
        await expect(spinner).toHaveCount(0);
        console.log("✅ Expected element is no longer visible (spinner disappeared)");
    }


}
