import { expect, test } from "@playwright/test";
import { user } from "../../../config/credentials";
import { delay, wait } from "../../../utils/waitUtils";
import { HomePage } from "../homePage.po";

test.describe("Search Bar Tests", () => {
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

    let countResults;

    // wait for the results count to be greater than 4
    await wait(
      () => {
        return new Promise(async (resolve, reject) => {
          countResults = await homePage.countSearchResults();
          if (countResults !== null && countResults > 5) {
            resolve(countResults);
          } else {
            reject;
          }
        });
      },
      20000,
      1000,
      "Did not find at least 5 elements"
    );

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
