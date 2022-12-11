import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage.po";

export class HomePage extends BasePage {
  readonly _userInfoProfileName: Locator;
  readonly _searchButton: Locator;
  readonly _searchBar: Locator;
  readonly _searchResultList: Locator;
  _searchResultElementTitle: Locator;

  constructor(page: Page) {
    super(page);
    this._userInfoProfileName = this.page.locator(
      'div[class="user-info__profile-name"] > span'
    );
    this._searchButton = this.page.locator("#btn-search");
    this._searchBar = this.page.locator("#search-widget-form > input");
    this._searchResultList = this.page.locator('div[class="game-item"]');
  }

  async obtainUserinfoUsername(): Promise<string | null> {
    return await this._userInfoProfileName.textContent();
  }

  async clickSearch(): Promise<void> {
    await this._searchButton.click();
  }

  async typeSearch(search): Promise<void> {
    await this._searchBar.click();
    await this._searchBar.type(search);
  }

  async countSearchResults(): Promise<number> {
    return await this._searchResultList.count();
  }

  async obtainResultTitle(row): Promise<string | null> {
    this._searchResultElementTitle = this.page.locator(
      "#search-widget-game-list > div:nth-child(" +
        row +
        ') > div[class="game-info"] > div[class="game-name"]'
    );
    return await this._searchResultElementTitle.textContent();
  }
}
