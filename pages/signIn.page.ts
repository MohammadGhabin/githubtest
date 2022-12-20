import { Page } from "@playwright/test";
import { commonData } from "../data/common.data";
import { homePageSelectors } from "../selectors/homePage.selectors";
import { signInPageSelectors } from "../selectors/signInPage.selectors";
import { Util } from "../utils/util";

export class signInPage {
  page: Page;
  util: Util;

  constructor(page: Page) {
    this.page = page;
    this.util = new Util(page);
  }

  async gotoSignInPage(): Promise<void> {
    await this.util.goto(commonData.githubUrl);
  }

  async signInUser(user: {
    userName: string;
    email: string;
    password: string;
  }): Promise<void> {
    await this.util.waitForSelector(signInPageSelectors.signInLink);
    await this.util.click(
      signInPageSelectors.signInLink,
      signInPageSelectors.signInForm
    );
    await this.util.waitForSelector(signInPageSelectors.signInForm);

    await this.util.fill(signInPageSelectors.userName, user.email);
    await this.util.fill(signInPageSelectors.password, user.password);

    await this.util.waitForSelector(signInPageSelectors.signInButton);
    await this.util.click(
      signInPageSelectors.signInButton,
      homePageSelectors.navigationMenu
    );
    await this.util.waitForSelector(homePageSelectors.navigationMenu);

    // if(await (await this.util.locator(signInPageSelectors.deviceVerificationView)).isVisible){
    //   const newPage: Page =
    // }
  }

  async signOutUser(): Promise<void> {
    await this.util.waitForSelector(homePageSelectors.viewProfileMenuButton);

    await this.util.click(
      homePageSelectors.viewProfileMenuButton,
      homePageSelectors.yourProfileDropDownMenuItem
    );
    await this.util.waitForSelector(
      homePageSelectors.yourProfileDropDownMenuItem
    );
    await this.util.waitForSelector(signInPageSelectors.signOutButton);

    await this.util.click(
      signInPageSelectors.signOutButton,
      signInPageSelectors.signInLink
    );
    await this.util.waitForSelector(signInPageSelectors.signInLink);
  }
}
