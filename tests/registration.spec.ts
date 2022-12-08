import { test, expect } from '@playwright/test';
import { RegistrationPage } from './registration.po';

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

test.describe('User Registration Tests', () => {
  let registrationPage: RegistrationPage;

  test('can click on Sign Up ending in user registration page', async ({page}) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.goHome();
    await registrationPage.clickGotIt();
    await registrationPage.clickSignUp();
    await registrationPage.waitFormDisplayed();
    await delay(2000);
  });

  test.only('can fill the form to register a new user', async ({page}) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigateTo();
    await registrationPage.clickGotIt();
    await registrationPage.typeEmail('example@email.com');
    await registrationPage.clickTermsAndCons();
    await registrationPage.selectCurrency('EUR');
    await registrationPage.typePassword('password');
    await registrationPage.typeReenterPassword('password');
    await registrationPage.typeNickname('ExampleNickname');
    await registrationPage.typeName('ExampleName');
    await registrationPage.typeLastName('ExampleLastName');
    await registrationPage.typeMiddleName('ExampleMiddleName');
    await registrationPage.selectSecretQuestion('Grandmother');
    await registrationPage.selectBirthday(1,2,2000);
    await registrationPage.typeAddress('Example Street 1234');
    await registrationPage.selectCountry('Spain');
    await registrationPage.typeCity('ExampleCity');
    await registrationPage.typePostalCode('99887');
    await delay(6000);
  });
});
