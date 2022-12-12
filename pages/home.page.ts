import { Page } from "@playwright/test";
import { homePageSelectors } from "../selectors/homePage.selectors";
import { profilePageSelectors } from "../selectors/profilePage.selectors";
import { Util } from "../utils/util";

export class homePage {
  page: Page;
  util: Util;

  constructor(page: Page) {
    this.page = page;
    this.util = new Util(page);
  }

  async gotoProfilePage(): Promise<void> {
    await this.util.click(
      homePageSelectors.viewProfileMenuButton,
      homePageSelectors.yourProfileDropDownMenuItem
    );
    await this.util.waitForSelector(
      homePageSelectors.yourProfileDropDownMenuItem
    );

    await this.util.click(
      homePageSelectors.yourProfileDropDownMenuItem,
      profilePageSelectors.ContributionActivityView
    );
    await this.util.waitForSelector(
      profilePageSelectors.ContributionActivityView
    );
  }
}
