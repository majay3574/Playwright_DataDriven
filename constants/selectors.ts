// constants/selectors.ts
export const selectors = {
  username: '#username',
  password: '#password',
  loginBtn: '#Login',
  applauncherIcon: 'button[title="App Launcher"]',
  homeLabel: `//div[@class='setup-header-element']//span[text()='Home']`,
  viewAllBtn: `//button[text()="View All"]`,
  appItemSearchField: "one-app-launcher-modal input.slds-input",
  appOrItem: (appName: string) => `//mark[text()='${appName}']`,
  saveBtn: `//button[text()='Save']`,
  newBtn: `div:text-is('New')`,
  salutation: "button[name='salutation']",
  saluationValue: (value: string) => "span:text-is('" + value + "')",
  firstName: "//label[text()='First Name']//following::input[1]",
  lastName: "//label[text()='Last Name']//following::input[1]",
  company: "//label[text()='Company']//following::input[1]",
  verificationText: "slot[name='primaryField'] lightning-formatted-name",
  searchLeadInput: "div[class^='slds-form-element__control'] input",

  leadStatusDDBtn: `//label[text()='Lead Status']//following::button[1]`,
  industryDDBtn: `//label[text()='Industry']//following::button[1]`,
  leadSourceDDBtn: `//label[text()='Lead Source']//following::button[1]`,
  ratingDDBtn: "//label[text()='Rating']//following::button[1]",
  dropdownValueSelector: (data: string) => `//div[@role='listbox']//span[text()='${data}']`,

  street: `textarea[name="street"]`,
  city: `input[name="city"]`,
  zipPostalCode: `input[name="postalCode"]`,
  province: `input[name="province"]`,
  country: `input[name="country"]`
};


