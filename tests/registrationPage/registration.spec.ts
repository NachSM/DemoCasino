import { test, expect } from "@playwright/test";
import { RegistrationPage } from "./registration.po";
import { Inbox } from "mailinator-inbox";
import { faker } from "@faker-js/faker";

// Can manually set variables here and remove the generation of the user to use this static values
let EMAIL = "";
let CURRENCY:
  | "USD"
  | "EUR"
  | "ILS"
  | "mLTC"
  | "mDOGE"
  | "USDTT"
  | "USDTE"
  | "mBCH"
  | "mETH"
  | "RUB"
  | "BYR"
  | "USDT" = "EUR";
let PASSWORD = "";
let NICKNAME = "";
let NAME = "";
let LASTNAME = "";
let MIDNAME = "";
let SECRETQUESTION:
  | "Music"
  | "Street"
  | "Actor"
  | "Grandmother"
  | "Postcode"
  | "Car"
  | "Teacher"
  | "Book"
  | "Game"
  | "Custom" = "Grandmother";
let SECRETANSWER = "";
let BIRTHDAY = { day: 12, month: 11, year: 2002 };
let ADDRESS = "";
let CITY = "";
let COUNTRY = "";
let ZIP = "";
let registrationPage: RegistrationPage;

// Stop the execution for the specified time
function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

// Doesn't work, requires API key from monthly payment
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function retrieveRegEmail(address) {
  const inbox = new Inbox(address);
  await inbox.refresh();
  const emailHeaders = inbox.emailHeaders;
  for (let i = 0; i < emailHeaders.length; i++) {
    if (emailHeaders[i].subject.includes("Registration")) {
      return await inbox.getEmail(emailHeaders[i].id);
    }
    retrieveRegEmail(address);
  }
}

// Function to generate random new user
function generateNewUser() {
  EMAIL = faker.internet.userName() + "@mailinator.com";
  CURRENCY = "EUR";
  // Make sure password has at least 1 numeric character
  PASSWORD = faker.internet.password() + faker.datatype.number();
  NICKNAME = faker.internet.userName();
  NAME = faker.name.firstName();
  LASTNAME = faker.name.lastName();
  MIDNAME = faker.name.middleName();
  SECRETQUESTION = "Grandmother";
  SECRETANSWER = faker.name.fullName();
  BIRTHDAY = { day: 1, month: 2, year: 2000 };
  ADDRESS = faker.address.streetAddress();
  CITY = faker.address.city();
  COUNTRY = faker.address.country();
  ZIP = faker.address.zipCode();
}

// Print the generated user data for validation
function printNewUser() {
  console.log(`
  The generated user has the following data:
  Email: ${EMAIL},
  Currency: ${CURRENCY},
  Password: ${PASSWORD},
  Nickname: ${NICKNAME},
  Name: ${NAME},
  Last Name: ${LASTNAME},
  Middle Name: ${MIDNAME},
  Secret Question: ${SECRETQUESTION},
  Secret Answer: ${SECRETANSWER},
  Birthday: ${BIRTHDAY.day}/${BIRTHDAY.month}/${BIRTHDAY.year},
  Address: ${ADDRESS},
  City: ${CITY},
  Country: ${COUNTRY},
  ZIP: ${ZIP},
  `);
}

async function populateFields() {
  await registrationPage.typeEmail(EMAIL);
  await registrationPage.clickTermsAndCons();
  await registrationPage.selectCurrency(CURRENCY);
  await registrationPage.typePassword(PASSWORD);
  await registrationPage.typeReenterPassword(PASSWORD);
  await registrationPage.typeNickname(NICKNAME);
  await registrationPage.typeName(NAME);
  await registrationPage.typeLastName(LASTNAME);
  await registrationPage.typeMiddleName(MIDNAME);
  await registrationPage.selectSecretQuestion(SECRETQUESTION);
  await registrationPage.typeSecretAnswer(SECRETANSWER);
  await registrationPage.selectBirthday(
    BIRTHDAY.day,
    BIRTHDAY.month,
    BIRTHDAY.year
  );
  await registrationPage.typeAddress(ADDRESS);
  await registrationPage.selectCountry(COUNTRY);
  await registrationPage.typeCity(CITY);
  await registrationPage.typePostalCode(ZIP);
}

test.describe("User Registration Tests", () => {
  test("can go from home to registration page", async ({ page }) => {
    registrationPage = new RegistrationPage(page);

    // Navigate to home page and move to the registration page
    await registrationPage.goHome();
    await registrationPage.clickGotIt();
    await registrationPage.clickSignUp();
    await registrationPage.waitFormDisplayed();
  });

  test("can fill the form to register a new user", async ({ page }) => {
    generateNewUser();
    printNewUser();
    registrationPage = new RegistrationPage(page);

    // Navigate to registration page
    await registrationPage.navigateTo();

    // Close popup message
    await registrationPage.clickGotIt();

    // Populate all the fields
    await populateFields();

    // Submit form
    await registrationPage.clickSubmit();

    // Check registration success
    await registrationPage.checkSuccessIcon();
    await registrationPage.checkSuccessMessage();
    await registrationPage.checkViewProfileButton();
    await registrationPage.checkBrowseGamesButton();

    // Check username profile on top right
    expect(await registrationPage.obtainUserinfoUsername()).toBe(NICKNAME);

    // If the email isn't found it will trigger the test timeout
    // const registrationEmail = await retrieveRegEmail(EMAIL);
    // expect(registrationEmail.body).toContain('Please confirm your registration in order to');
  });

  test("can fill the form to register a new user without middle name", async ({
    page,
  }) => {
    generateNewUser();
    MIDNAME = "";
    printNewUser();
    registrationPage = new RegistrationPage(page);

    // Navigate to registration page
    await registrationPage.navigateTo();

    // Close popup message
    await registrationPage.clickGotIt();

    // Populate all the fields
    await populateFields();

    // Submit form
    await registrationPage.clickSubmit();

    // Check registration success
    await registrationPage.checkSuccessIcon();
    await registrationPage.checkSuccessMessage();
    await registrationPage.checkViewProfileButton();
    await registrationPage.checkBrowseGamesButton();

    // Check username profile on top right
    expect(await registrationPage.obtainUserinfoUsername()).toBe(NICKNAME);

    // If the email isn't found it will trigger the test timeout
    // const registrationEmail = await retrieveRegEmail(EMAIL);
    // expect(registrationEmail.body).toContain('Please confirm your registration in order to');
  });

  test("cannot create a new user without email", async ({ page }) => {
    generateNewUser();
    printNewUser();
    registrationPage = new RegistrationPage(page);

    // Navigate to registration page
    await registrationPage.navigateTo();

    // Close popup message
    await registrationPage.clickGotIt();

    // Empty the mail variable
    EMAIL = "";

    // Populate all the fields except email
    await populateFields();

    // Submit form
    await registrationPage.clickSubmit();

    await delay(5000);

    expect(await registrationPage.obtainEmailErrorMessage()).toContain(
      "Email or phone number is required."
    );
  });

  // More tests for each mandatory field
});
