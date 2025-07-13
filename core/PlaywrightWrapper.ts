import { Page, BrowserContext, test, expect } from '@playwright/test';
import { IPlaywrightContext } from './IPlaywrightContext.ts';

/**
 * Wrapper class for Playwright browser context and page interactions.
 * Provides utility methods for navigation, element interaction, waiting, and verification.
 * Implements the IPlaywrightContext interface.
 */
export class PlaywrightWrapper implements IPlaywrightContext {

    context: BrowserContext;
    page: Page;

    constructor(playwrightCtx: IPlaywrightContext) {
        try {
            this.context = playwrightCtx.context;
            this.page = playwrightCtx.page;
        } catch (error) {
            console.error('Error in constructor', error);
            throw error;
        }
    }

    /**
       * Navigates to the specified URL and waits for the page to load.
       * @param url - The URL to navigate to.
       * @throws Will throw an error if navigation fails.
    */

    protected async goTo(url: string): Promise<void> {
        try {
            await test.step(`Navigate to the page URL: ${url}`, async () => {
                try {
                    await this.page.goto(url);
                    await this.waitUntilPageLoads();
                } catch (error) {
                    console.error(`Failed to navigate to ${url}`, error);
                    throw error;
                }
            });
        } catch (error) {
            console.error('Error in goTo', error);
            throw error;
        }
    }

    /**
         * Clicks on an element specified by the locator.
         * @param locator - The selector for the element to click.
         * @param name - The name of the element (for logging).
         * @param type - The type of the element (for logging).
         * @throws Will throw an error if the click action fails.
     */
    protected async click(locator: string, name: string, type: string) {
        try {
            await test.step(`The ${name} ${type} clicked`, async () => {
                try {
                    await this.page.waitForSelector(locator, { state: 'visible' });
                    await this.page.locator(locator).click();
                } catch (error) {
                    console.error(`Failed to click ${name} ${type}`, error);
                    throw error;
                }
            });
        } catch (error) {
            console.error('Error in click', error);
            throw error;
        }
    }

    /**
         * Fills a textbox or input field with the provided data.
         * @param locator - The selector for the input element.
         * @param name - The name of the input element (for logging).
         * @param data - The data to fill into the input element.
         * @throws Will throw an error if the fill action fails.
     */
    protected async fill(locator: string, name: string, data: string) {
        try {
            await test.step(`Textbox ${name} filled with data: ${data}`, async () => {
                try {
                    await this.page.waitForSelector(locator, { state: 'visible' });
                    await this.page.locator(locator).clear();
                    await this.page.locator(locator).fill(data);
                } catch (error) {
                    console.error(`Failed to fill ${name}`, error);
                    throw error;
                }
            });
        } catch (error) {
            console.error('Error in fill', error);
            throw error;
        }
    }


    /**
     * Fills a textbox or input field with the provided data and presses Enter.
     * @param locator - The selector for the input element.
     * @param name - The name of the input element (for logging).
     * @param data - The data to fill into the input element.
     * @throws Will throw an error if the fill or Enter action fails.
     */
    protected async fillAndEnter(locator: string, name: string, data: string) {
        try {
            await test.step(`Textbox ${name} filled with data: ${data}`, async () => {
                try {
                    await this.page.locator(locator).clear();
                    await this.page.fill(locator, data, { force: true });
                    await this.page.focus(locator);
                    await this.page.keyboard.press("Enter");
                } catch (error) {
                    console.error(`Failed to fill and enter for ${name}`, error);
                    throw error;
                }
            });
        } catch (error) {
            console.error('Error in fillAndEnter', error);
            throw error;
        }
    }

    /**
     * Types the provided data into an input field using keyboard events.
     * @param locator - The selector for the input element.
     * @param data - The data to type into the input element.
     * @throws Will throw an error if the typing action fails.
     */
    protected async keyboardType(locator: string, data: string) {
        try {
            await test.step(`Textbox filled with data: ${data}`, async () => {
                try {
                    await this.page.locator(locator).clear();
                    await this.page.focus(locator);
                    await this.page.keyboard.type(data, { delay: 100 });
                } catch (error) {
                    console.error(`Failed to keyboard type`, error);
                    throw error;
                }
            });
        } catch (error) {
            console.error('Error in keyboardType', error);
            throw error;
        }
    }

    /**
     * Types the provided data into an input field and presses Enter.
     * @param locator - The selector for the input element.
     * @param name - The name of the input element (for logging).
     * @param data - The data to type into the input element.
     * @throws Will throw an error if the typing or Enter action fails.
     */
    protected async typeAndEnter(locator: string, name: string, data: string) {
        try {
            await test.step(`Textbox ${name} filled with data: ${data}`, async () => {
                try {
                    await this.page.locator(locator).clear();
                    await this.page.keyboard.type(data, { delay: 400 });
                    await this.page.keyboard.press("Enter");
                } catch (error) {
                    console.error(`Failed to type and enter for ${name}`, error);
                    throw error;
                }
            });
        } catch (error) {
            console.error('Error in typeAndEnter', error);
            throw error;
        }
    }


    /**
     * Retrieves the inner text of an element specified by the selector.
     * @param selector - The selector for the element.
     * @returns The inner text of the element.
     * @throws Will throw an error if the text cannot be retrieved.
     */
    protected async getText(selector: string): Promise<string> {
        try {
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
        } catch (error) {
            console.error('Error in getText', error);
            throw error;
        }
    }

    /**
     * Waits for an element to become visible on the page.
     * @param selector - The selector for the element.
     * @param name - The name of the element (for logging).
     * @throws Will throw an error if the element does not become visible.
     */
    protected async waitForElementVisible(selector: string, name: string): Promise<void> {
        try {
            await test.step(`Wait for element visible: ${name}`, async () => {
                try {
                    await this.page.waitForSelector(selector, { state: 'visible', timeout: 20000 });
                    console.log(`Element "${name}" is visible`);
                } catch (error) {
                    console.error(`Element "${name}" not visible`, error);
                    throw error;
                }
            });
        } catch (error) {
            console.error('Error in waitForElementVisible', error);
            throw error;
        }
    }

    /**
     * Waits for an element to become hidden on the page.
     * @param selector - The selector for the element.
     * @param name - The name of the element (for logging).
     * @throws Will throw an error if the element does not become hidden.
     */
    protected async waitForElementHidden(selector: string, name: string): Promise<void> {
        try {
            await test.step(`Wait for element hidden: ${name}`, async () => {
                try {
                    await this.page.waitForSelector(selector, { state: 'hidden', timeout: 20000 });
                    console.log(`Element "${name}" is hidden`);
                } catch (error) {
                    console.error(`Element "${name}" is still visible`, error);
                    throw error;
                }
            });
        } catch (error) {
            console.error('Error in waitForElementHidden', error);
            throw error;
        }
    }

    /**
     * Waits until the page has fully loaded.
     * @throws Will throw an error if the page does not load completely.
     */
    protected async waitUntilPageLoads(): Promise<void> {
        try {
            await test.step(`Wait for page load`, async () => {
                try {
                    console.log(`Waiting for page to load completely`);
                    await this.page.waitForLoadState('load');
                } catch (error) {
                    console.error(`Page did not load completely`, error);
                    throw error;
                }
            });
        } catch (error) {
            console.error('Error in waitUntilPageLoads', error);
            throw error;
        }
    }

     /**
     * Waits for a specified duration based on the wait type.
     * @param waitType - The type of wait: 'minWait', 'mediumWait', or 'maxWait'.
     * @throws Will throw an error if an invalid wait type is provided.
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
            throw error;
        }
    }

    /**
     * Waits for an element to be attached to the DOM.
     * @param locator - The selector for the element.
     * @param name - The name of the element (for logging). Defaults to "Element".
     * @throws Will throw an error if the element is not attached within the timeout.
     */
    protected async waitSelector(locator: string, name?: string | "Element") {
        try {
            await test.step(`Waiting for ${name} Visible`, async () => {
                try {
                    await this.page.waitForSelector(locator, { timeout: 30000, state: "attached" });
                } catch (error) {
                    console.error(`Failed waiting for ${name} to be visible`, error);
                    throw error;
                }
            });
        } catch (error) {
            console.error('Error in waitSelector', error);
            throw error;
        }
    }

    /**
     * Verifies that the actual text matches the expected text exactly.
     * @param actual - The actual text to verify.
     * @param expected - The expected text to match.
     * @throws Will throw an error if the texts do not match.
     */
    protected async verifyExactTextMatched(actual: string, expected: string): Promise<void> {
        try {
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
        } catch (error) {
            console.error('Error in verifyExactTextMatched', error);
            throw error;
        }
    }

    /**
     * Waits for a spinner element to disappear from the page.
     * @throws Will throw an error if the spinner does not disappear.
     */
    public async spinnerDisappear(): Promise<void> {
        try {
            await this.wait('minWait');
            const spinner = this.page.locator("//div[@class='slds-spinner_container slds-grid']");
            await expect(spinner).toHaveCount(0);
            console.log("✅ Expected element is no longer visible (spinner disappeared)");
        } catch (error) {
            console.error('Error in spinnerDisappear', error);
            throw error;
        }
    }
}
