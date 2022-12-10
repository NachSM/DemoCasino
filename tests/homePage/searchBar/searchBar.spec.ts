import { expect, test } from '@playwright/test';
import { HomePage } from '../homePage.po';

// Stop the execution for the specified time
function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

test.describe('User Registration Tests', () => {
  let homePage: HomePage;
  const username = 'foshcasinotest@mailinator.com';
  const password = 'Password1';

  test.only('can login and search results', async ({page}) => {
    homePage = new HomePage(page);
    await homePage.login(username, password);
    expect(await homePage.obtainUserinfoUsername()).toBe('TestMailinator');
    await homePage.clickSearch();
    await homePage.typeSearch('Game');

    await delay(50000);
  });

});
