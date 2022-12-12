import { Page } from "@playwright/test";
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
      repositoriesPageSelectors.searchRepositoryInput
    );
    await this.util.waitForSelector(
      repositoriesPageSelectors.searchRepositoryInput
    );
  }

  async gotoProjectsPage(): Promise<void> {
    await this.util.click(
      homePageSelectors.viewProfileMenuButton,
      homePageSelectors.yourProjectsDropDownMenuItem
    );
    await this.util.waitForSelector(
      homePageSelectors.yourProjectsDropDownMenuItem
    );

    await this.util.click(
      homePageSelectors.yourProjectsDropDownMenuItem,
      projectsPageSelectors.projectsView
    );
    await this.util.waitForSelector(projectsPageSelectors.projectsView);
  }
}
