import { Page } from "@playwright/test";
import { commonData } from "../data/common.data";
import { state } from "../data/state";
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
    await this.util.click(
      signInPageSelectors.signInLink,
      signInPageSelectors.signInForm,
      state.attached
    );
    await this.util.fill(signInPageSelectors.userName, user.email);
    await this.util.fill(signInPageSelectors.password, user.password);
    await this.util.click(
      signInPageSelectors.signInButton,
      homePageSelectors.navigationMenu,
      state.attached
    );
  }

  async signOutUser(): Promise<void> {
    await this.util.click(
      homePageSelectors.viewProfileMenuButton,
      homePageSelectors.yourProfileDropDownMenuItem,
      state.attached
    );
    await this.util.click(
      signInPageSelectors.signOutButton,
      signInPageSelectors.signInLink,
      state.attached
    );
  }
}
