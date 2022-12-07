import { Page } from "@playwright/test";
import { state } from "../data/state";
import { homePageSelectors } from "../selectors/homePage.selectors";
import { profilePageSelectors } from "../selectors/profilePage.selectors";
import { projectsPageSelectors } from "../selectors/projectsPage.selectors";
import { repositoriesPageSelectors } from "../selectors/repositoriesPage.selectors";
import { Util } from "../utils/util";

export class profilePage {
  page: Page;
  util: Util;

  constructor(page: Page) {
    this.page = page;
    this.util = new Util(page);
  }

  async gotoRepositoriesPage(): Promise<void> {
    await this.util.click(
      profilePageSelectors.repositoriesButton,
      repositoriesPageSelectors.searchRepositoryInput,
      state.attached
    );
  }

  async gotoProjectsPage(): Promise<void> {
    await this.util.click(
      homePageSelectors.viewProfileMenuButton,
      homePageSelectors.yourProjectsDropDownMenuItem,
      state.attached
    );
    await this.util.click(
      homePageSelectors.yourProjectsDropDownMenuItem,
      projectsPageSelectors.projectsView,
      state.attached
    );
  }
}
