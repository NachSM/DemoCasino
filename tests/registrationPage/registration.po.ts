import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage.po";

export class RegistrationPage extends BasePage {
  readonly _formLayout: Locator;
  readonly _emailSwitch: Locator;
  readonly _phoneSwitch: Locator;
  readonly _email: Locator;
  readonly _phone: Locator;
  readonly _termsAndConds: Locator;
  readonly _currency: Locator;
  readonly _currencyDropdown: Locator;
  readonly _password: Locator;
  readonly _repassword: Locator;
  readonly _nickname: Locator;
  readonly _name: Locator;
  readonly _lastName: Locator;
  readonly _middleName: Locator;
  readonly _bonusListElement: Locator;
  readonly _secretQuestion: Locator;
  readonly _secretAnswer: Locator;
  readonly _secretQuestionList: Locator;
  readonly _birthday: Locator;
  readonly _address: Locator;
  readonly _country: Locator;
  readonly _city: Locator;
  readonly _postalCode: Locator;
  readonly _countryList: Locator;
  readonly _submitButton: Locator;
  readonly _calendar: {
    prev: Locator;
    next: Locator;
    title: Locator;
    years: Locator;
    months: Locator;
    days: Locator;
  };
  readonly _successIcon: Locator;
  readonly _successMessage: Locator;
  readonly _viewProfileButton: Locator;
  readonly _browseGamesButton: Locator;
  readonly _userInfoProfileName: Locator;
  readonly _emailError: Locator;

  constructor(page: Page) {
    super(page);

    // Form fields
    this._formLayout = this.page.locator("#registration_form_1");
    this._emailSwitch = this.page.locator(
      "#registration_form_1 > fieldset:nth-child(3) > div > div.tabs__wrapper > div > div > div.selectric-items > div > ul > li:nth-child(1)"
    );
    this._phoneSwitch = this.page.locator(
      "#registration_form_1 > fieldset:nth-child(3) > div > div.tabs__wrapper > div > div > div.selectric-items > div > ul > li:nth-child(2)"
    );
    this._email = this.page.locator(
      "#core__protected_modules_user_yiiForm_RegistrationForm_email"
    );
    this._phone = this.page.locator(
      "#core__protected_modules_user_yiiForm_RegistrationForm_phone"
    );
    this._termsAndConds = this.page.locator(
      'label[for="core__protected_modules_user_yiiForm_RegistrationForm_terms_and_conditions"]'
    );
    this._currency = this.page.locator(
      "#registration_form_1 > fieldset.form__section.form__section--registration > div:nth-child(4) > div"
    );
    this._currencyDropdown = this.page.locator(
      "#registration_form_1 > fieldset.form__section.form__section--registration > div:nth-child(4) > div > div.selectric-wrapper.selectric-below.selectric-open > div.selectric-items > div > ul"
    );
    this._password = this.page.locator(
      "#core__protected_modules_user_yiiForm_RegistrationForm_password"
    );
    this._repassword = this.page.locator(
      "#core__protected_modules_user_yiiForm_RegistrationForm_password_confirmation"
    );
    this._nickname = this.page.locator(
      "#core__protected_modules_user_yiiForm_RegistrationForm_nickname"
    );
    this._name = this.page.locator(
      "#core__protected_modules_user_yiiForm_RegistrationForm_name"
    );
    this._lastName = this.page.locator(
      "#core__protected_modules_user_yiiForm_RegistrationForm_surname"
    );
    this._middleName = this.page.locator(
      "#core__protected_modules_user_yiiForm_RegistrationForm_middle_name"
    );
    this._secretQuestion = this.page.locator(
      "#registration_form_1 > fieldset.form__section.form__section--registration > div:nth-child(17) > div"
    );
    this._secretQuestionList = this.page.locator(
      "#registration_form_1 > fieldset.form__section.form__section--registration > div:nth-child(17) > div > div.selectric-wrapper.selectric-open.selectric-below > div.selectric-items > div > ul"
    );
    this._secretAnswer = this.page.locator(
      "#core__protected_modules_user_yiiForm_RegistrationForm_secret_answer"
    );
    this._birthday = this.page.locator(
      "#core__protected_modules_user_yiiForm_RegistrationForm_birthday"
    );
    this._address = this.page.locator(
      "#core__protected_modules_user_yiiForm_RegistrationForm_address"
    );
    this._country = this.page.locator(
      "#registration_form_1 > fieldset.form__section.form__section--registration > div:nth-child(21) > div > div.selectric-wrapper > div.selectric.selectric--placeholder"
    );
    this._countryList = this.page.locator(
      "#registration_form_1 > fieldset.form__section.form__section--registration > div:nth-child(21) > div > div.selectric-wrapper.selectric-below.selectric-open > div.selectric-items > div > ul"
    );
    this._city = this.page.locator(
      "#core__protected_modules_user_yiiForm_RegistrationForm_city"
    );
    this._postalCode = this.page.locator(
      "#core__protected_modules_user_yiiForm_RegistrationForm_postcode"
    );
    this._submitButton = this.page.locator(
      'button[data-test="control-submit"]'
    );
    this._calendar = {
      prev: this.page.locator('div[data-action="prev"]'),
      next: this.page.locator('div[data-action="next"]'),
      title: this.page.locator('div[class="datepicker--nav-title"]'),
      years: this.page.locator(
        'div[class="datepicker--cells datepicker--cells-years"]'
      ),
      months: this.page.locator(
        'div[class="datepicker--cells datepicker--cells-months"]'
      ),
      days: this.page.locator(
        'div[class="datepicker--cells datepicker--cells-days"]'
      ),
    };

    // Registration success page
    this._successIcon = this.page.locator('i[class="icon-success"]');
    this._successMessage = this.page.locator('h1[class="notification__title"]');
    this._viewProfileButton = this.page.locator('a[href="/cabinet/profile"]');
    this._browseGamesButton = this.page.locator(
      'div[class="notification__buttons"] > a[href="/gameList"]'
    );
    this._userInfoProfileName = this.page.locator(
      'div[class="user-info__profile-name"] > span'
    );

    // Error messages
    this._emailError = this.page.locator(
      "#core__protected_modules_user_yiiForm_RegistrationForm_email_em_"
    );
  }

  override async navigateTo(): Promise<void> {
    await super.navigateTo("user/registration");
  }

  async waitFormDisplayed(): Promise<void> {
    await this._formLayout.isVisible();
  }

  async clickBonusListElement(
    element: "Bonus" | "Promo" | "NoBonus"
  ): Promise<void> {
    const myMap = new Map<string, string>([
      ["Bonus", "1"],
      ["Promo", "2"],
      ["NoBonus", "3"],
    ]);
    await this.page.locator(
      "#bonus-list > div:nth-child(" + myMap.get(element) + ")"
    );
  }

  async clickTermsAndCons(): Promise<void> {
    await this._termsAndConds.click();
  }

  async typeEmail(email): Promise<void> {
    await this._email.click();
    await this._email.type(email);
  }

  async selectCurrency(option: string): Promise<void> {
    await this._currency.click();
    await this._currencyDropdown
      .locator("li")
      .filter({ hasText: option })
      .click();
  }

  async typePassword(pass: string): Promise<void> {
    await this._password.click();
    await this._password.type(pass);
  }

  async typeReenterPassword(pass: string): Promise<void> {
    await this._repassword.click();
    await this._repassword.type(pass);
  }

  async typeNickname(nick: string): Promise<void> {
    await this._nickname.click();
    await this._nickname.type(nick);
  }

  async typeName(name: string): Promise<void> {
    await this._name.click();
    await this._name.type(name);
  }

  async typeLastName(lastName: string): Promise<void> {
    await this._lastName.click();
    await this._lastName.type(lastName);
  }

  async typeMiddleName(middleName: string): Promise<void> {
    await this._middleName.click();
    await this._middleName.type(middleName);
  }

  async typeAddress(address: string): Promise<void> {
    await this._address.click();
    await this._address.type(address);
  }

  async typeCity(city: string): Promise<void> {
    await this._city.click();
    await this._city.type(city);
  }

  async typePostalCode(code: string): Promise<void> {
    await this._postalCode.click();
    await this._postalCode.type(code);
  }

  async typeSecretAnswer(answer: string): Promise<void> {
    await this._secretAnswer.click();
    await this._secretAnswer.type(answer);
  }

  async selectSecretQuestion(
    question:
      | "Music"
      | "Street"
      | "Actor"
      | "Grandmother"
      | "Postcode"
      | "Car"
      | "Teacher"
      | "Book"
      | "Game"
      | "Custom"
  ): Promise<void> {
    const myMap = new Map<string, string>([
      ["Music", "Your favorite musician's surname"],
      ["Street", "The street your grew up on"],
      ["Actor", "Your favorite actor or actress"],
      ["Grandmother", "Your grandmother's date of birth"],
      ["Postcode", "Your parents' post code"],
      ["Car", "The brand of your first car"],
      ["Teacher", "Your favorite teacher's surname"],
      ["Book", "Your favorite childhood book"],
      ["Game", "Your favorite computer game"],
      ["Custom", "Set your own security word or phrase"],
    ]);
    await this._secretQuestion.click();
    await this._city.scrollIntoViewIfNeeded();
    await (
      await this._secretQuestionList
        .locator("li")
        .filter({ hasText: myMap.get(question) })
    ).click();
  }

  async selectCountry(country: string): Promise<void> {
    await this._country.click();
    await (
      await this._countryList.locator("li").filter({ hasText: country })
    ).click();
  }

  async clickSubmit(): Promise<void> {
    await this._submitButton.click();
  }

  async checkSuccessIcon(): Promise<void> {
    await this._successIcon.isVisible();
  }

  async checkSuccessMessage(): Promise<void> {
    await this._successMessage.isVisible();
  }

  async checkViewProfileButton(): Promise<void> {
    await this._viewProfileButton.isVisible();
  }

  async checkBrowseGamesButton(): Promise<void> {
    await this._browseGamesButton.isVisible();
  }

  async obtainUserinfoUsername(): Promise<string | null> {
    return await this._userInfoProfileName.textContent();
  }

  async obtainEmailErrorMessage(): Promise<string | null> {
    return await this._emailError.textContent();
  }

  async selectBirthday(
    day: number,
    month: number,
    year: number
  ): Promise<void> {
    await this._birthday.click();
    await this._calendar.title.click();
    await this._calendar.title.click();
    await this._calendar.years.locator('div[data-year="' + year + '"]').click();
    await this._calendar.months
      .locator('div[data-month="' + month + '"]')
      .click();
    await this._calendar.days
      .locator('div[data-date="' + day + '"][data-month="' + month + '"]')
      .click();
  }
}
