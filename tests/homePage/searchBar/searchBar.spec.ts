import { expect, test } from "@playwright/test";
import { user } from "../../../config/credentials";
import { HomePage } from "../homePage.po";

// Stop the execution for the specified time
function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

test.describe("User Registration Tests", () => {
  let homePage: HomePage;

  // Start with a login on each test
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.login(user.username, user.password);
    expect(await homePage.obtainUserinfoUsername()).toBe("TestMailinator");
  });

  test("can search results", async () => {
    await homePage.clickSearch();
    await homePage.typeSearch("Game");
    // Wait for results to load
    await delay(3000);
    const countResults = await homePage.countSearchResults();
    expect(countResults).toBeGreaterThan(5);

    // Iterate through all childs, first child is row 1
    for (let i = 1; i <= countResults; i++) {
      expect(
        await (await homePage.obtainResultTitle(i).toString()).toUpperCase()
      ).toContain("GAME");
    }
  });

  test("should show no results when searching for incoherent strings", async () => {
    await homePage.clickSearch();
    await homePage.typeSearch("qwertpoiasdlmzcxnv");
    // Wait for results to load
    await delay(3000);
    const countResults = await homePage.countSearchResults();
    expect(countResults).toBe(0);
  });
});
