import test from "@playwright/test";
import { SalesforceLoginPage } from "../page/salesforceLogin";
import userCredential from "../data/credentials.json";
import { SalesforceHomePage } from "../page/salesforceHomePage";
import { SalesforceLeadPage } from "../page/salesforceLeadPage";
import { FakerData } from "../utils/fakerUtils";
import { readCSV } from "../utils/csvUtils";
import path from "path";

const testData = readCSV(path.join(__dirname, '../data/leadData.csv'));

testData.forEach((data, index) => {
    test(`Lead Creation [${index + 1}] | ${data.Salutation || "NoSalutation"} (${data["Lead Source"] || "NoLeadSource"}, ${data.Industry || "NoIndustry"}, ${data.Rating || "NoRating"}) [Row ${index}]`, async ({ page, context }) => {

        // Generate fresh Faker data inside the test block to ensure retry-safe consistency
        const firstName = FakerData.getFirstName();
        const lastName = FakerData.getLastName();
        const company = FakerData.randomCityName();

        const salesforceLogin = new SalesforceLoginPage(page, context);
        const salesforceHome = new SalesforceHomePage(page, context);
        const salesforceLead = new SalesforceLeadPage(page, context);

        await salesforceLogin.salesforceLogin(userCredential.username, userCredential.password);
        await salesforceLogin.verifyHomeLabel();

        await salesforceHome.appLauncher();
        await salesforceHome.viewAll();
        await salesforceHome.searchApp("Leads");
        await salesforceHome.app("Leads");

        await salesforceLead.newButton();
        await salesforceLead.salutation(data.Salutation);
        await salesforceLead.firstName(firstName);
        await salesforceLead.lastName(lastName);
        await salesforceLead.Company(company);
        await salesforceLead.ratingDropdown(data.Rating);
        await salesforceLead.selectLeadSourceDD(data["Lead Source"]);
        await salesforceLead.selectLeadStatusDD(data["Lead Status"]);
        await salesforceLead.selectIndustryDD(data.Industry);
        await salesforceLead.enterStreet(data.Street);
        await salesforceLead.enterCity(data.City);
        await salesforceLead.enterPostalCode(data["Postal Code"]);
        await salesforceLead.enterState(data.State);
        await salesforceLead.enterCountry(data.Country);
        await salesforceLead.saveButton();
        await salesforceLead.verifyTheLeadAccount(firstName);
    });
});
