import { Page, BrowserContext } from "@playwright/test";
import { selectors } from "../constants/selectors";
import { PlaywrightWrapper } from "../core/PlaywrightWrapper";


export class SalesforceLeadPage extends PlaywrightWrapper {
    constructor(page: Page, context: BrowserContext) {
        super({ page, context });
    }

    public async newButton() {
        await this.waitForElementVisible(selectors.newBtn, "New Button")
        await this.click(selectors.newBtn, "New", "Button")
    }
    public async salutation(value: string) {
        await this.click(selectors.salutation, "Salutation", "Button")
        await this.click(selectors.saluationValue(value), "Salutation Value", "Button")
    }

    public async firstName(value: string) {
        await this.fill(selectors.firstName, "First Name", value)
    }

    public async lastName(value: string) {
        await this.fill(selectors.lastName, "Last Name", value)
    }


    public async Company(value: string) {
        await this.fill(selectors.company, "Last Name", value)
    }

    public async saveButton() {
        await this.click(selectors.saveBtn, "Save", "Button")
    }

    public async verifyTheLeadAccount(expectedValue: string) {
        await this.waitForElementVisible(selectors.verificationText, "Lead Name")
        const leadName = await this.getText(selectors.verificationText);
        let splitedvalue = leadName.split(" ")
        let extractedValue = splitedvalue[1].trim();
        await this.verifyExactTextMatched(extractedValue, expectedValue);

    }

    public async searchLead(value: string) {
        await this.waitForElementVisible(selectors.searchLeadInput, "Search Field");
        await this.typeAndEnter(selectors.searchLeadInput, "Search Field", value);
    }

    /**
 * Selects a value from the Lead Source dropdown.
 * 
 * @param data - The rating Dropdown option to select (e.g., 'Warm')
 */
    public async ratingDropdown(data: string) {
        await this.click(selectors.ratingDDBtn, "Rating", "Button");
        await this.click(selectors.dropdownValueSelector(data), data, "Button");
    }

    /**
  * Selects a value from the Lead Source dropdown.
  * 
  * @param data - The lead source option to select (e.g., 'Web', 'Phone Inquiry')
  */
    public async selectLeadSourceDD(data: string): Promise<void> {
        await this.click(selectors.leadSourceDDBtn, "Lead Source Dropdown", "Button");
        await this.click(selectors.dropdownValueSelector(data), data, "Button");
    }

    /**
 * Selects a value from the Industry dropdown.
 * 
 * @param data - The industry option to select (e.g., 'Agriculture', 'Apparel')
 */
    public async selectIndustryDD(data: string): Promise<void> {
        await this.click(selectors.industryDDBtn, "Industry Dropdown", "Button");
        await this.click(selectors.dropdownValueSelector(data), data, "Button");
    }

    /**
 * Selects a value from the Lead Status dropdown.
 * 
 * @param data - The lead status option to select (e.g., 'Closed - Converted', 'Working - Contacted')
 */
    public async selectLeadStatusDD(data: string): Promise<void> {
        await this.click(selectors.leadStatusDDBtn, "Lead Status Dropdown", "Button");
        await this.click(selectors.dropdownValueSelector(data), data, "Button");
    }

    /**
 * Enters the value into the Street field.
 */
    public async enterStreet(data: string): Promise<void> {
        await this.fill(selectors.street, "Input", data);
    }


    /**
 * Enters the value into the City field.
 */
    public async enterCity(data: string): Promise<void> {
        await this.fill(selectors.city, "Input", data);
    }

    /**
     * Enters the value into the Postal Code field.
     */
    public async enterPostalCode(data: string): Promise<void> {
        await this.fill(selectors.zipPostalCode, "Input", data);
    }

    /**
     * Enters the value into the State field.
     */
    public async enterState(data: string): Promise<void> {
        await this.fill(selectors.province, "Input", data);
    }

    /**
     * Enters the value into the Country field.
     */
    public async enterCountry(data: string): Promise<void> {
        await this.fill(selectors.country, "Input", data);
    }



}