import { Page } from "@playwright/test";
import { state } from "../data/state";
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
      homePageSelectors.yourProfileDropDownMenuItem,
      state.attached
    );
    await this.util.click(
      homePageSelectors.yourProfileDropDownMenuItem,
      profilePageSelectors.ContributionActivityView,
      state.attached
    );
  }
}
