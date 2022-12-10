import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage.po";

export class HomePage extends BasePage {

    readonly _userInfoProfileName: Locator;
    readonly _searchButton: Locator;
    readonly _searchBar: Locator;

    constructor(page: Page) {
        super(page);
        this._userInfoProfileName = this.page.locator('div[class="user-info__profile-name"] > span');
        this._searchButton = this.page.locator('#btn-search');
        this._searchBar = this.page.locator('#search-widget-form > input');
    }

    async obtainUserinfoUsername() {
        return await this._userInfoProfileName.textContent();
    }

    async clickSearch() {
        await this._searchButton.click();
    }

    async typeSearch(search) {
        await this._searchBar.click();
        await this._searchBar.type(search);
    }

}