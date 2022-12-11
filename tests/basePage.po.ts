import { Locator, Page } from "@playwright/test";
import { endpoint } from "../config/endpoint";

// Base Page Object
export abstract class BasePage {
  // Base Elements
  readonly baseUrl: string;
  readonly _signUpButton: Locator;
  readonly _gotItModalButton: Locator;
  readonly _signInButton: Locator;
  readonly _signInDropdownButton: Locator;
  readonly _usernameInput: Locator;
  readonly _passwordInput: Locator;
  readonly _submitSignInButton: Locator;

  // Locators
  constructor(readonly page: Page) {
    this.baseUrl = endpoint;
    this._signUpButton = this.page.locator('a[data-test="nav-reg-head"]');
    this._gotItModalButton = this.page.locator(
      "#welcome_modal > div > div > button"
    );
    this._signInButton = this.page.locator(
      'div[class="button   header-button header-button--login"]'
    );
    this._signInDropdownButton = this.page.locator('a[href="/user/login"]');
    this._usernameInput = this.page.locator("#UserLogin_username");
    this._passwordInput = this.page.locator("#UserLogin_password");
    this._submitSignInButton = this.page.locator(
      'button[data-test="control-submit"]'
    );
  }

  protected async navigateTo(path?: string): Promise<void> {
    if (path) await this.page.goto(this.baseUrl + path);
    else await this.page.goto(this.baseUrl);
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

  async signIn(): Promise<void> {
    await this._signInButton.click();
    await this._signInDropdownButton.click();
  }

  async typeUsername(username): Promise<void> {
    await this._usernameInput.click();
    await this._usernameInput.type(username);
  }

  async typePassword(password): Promise<void> {
    await this._passwordInput.click();
    await this._passwordInput.type(password);
  }

  async clickSubmitSignIn(): Promise<void> {
    await this._submitSignInButton.click();
  }

  async login(username, password): Promise<void> {
    await this.navigateTo("user/login");
    await this.clickGotIt();
    await this.typeUsername(username);
    await this.typePassword(password);
    await this.clickSubmitSignIn();
  }
}
