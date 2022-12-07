import { Page } from "@playwright/test";
import { state } from "../data/state";
import { profilePageSelectors } from "../selectors/profilePage.selectors";
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
    await this.util.clickFirstMatch(
      profilePageSelectors.repositoriesButton,
      repositoriesPageSelectors.searchRepositoryInput,
      state.attached
    );
  }
}
