import { Locator, Page } from "@playwright/test";

export abstract class BasePage {
    readonly baseUrl: string;
    readonly _signUpButton: Locator;
    readonly _gotItModalButton: Locator;  

    constructor(readonly page: Page) {
        this.baseUrl = 'https://demo.casino/';
        this._signUpButton = this.page.locator('a[data-test="nav-reg-head"]');
        this._gotItModalButton = this.page.locator('#welcome_modal > div > div > button');
    }

    async goHome(): Promise<void> {
        await this.page.goto(this.baseUrl);
    }

    async clickSignUp(): Promise<void> {
        await this._signUpButton.click();        
    }

    async clickGotIt(): Promise<void> {
        await this._gotItModalButton.click();        
    }

    protected async navigateTo(path?: string): Promise<void> {
        if (path)
            await this.page.goto(this.baseUrl + path);
        else
            await this.page.goto(this.baseUrl);

    }

}