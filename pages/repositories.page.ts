import { Page } from "@playwright/test";
import { state } from "../data/state";
import { homePageSelectors } from "../selectors/homePage.selectors";
import { profilePageSelectors } from "../selectors/profilePage.selectors";
import { repositoriesPageSelectors } from "../selectors/repositoriesPage.selectors";
import { Util } from "../utils/util";

export class repositoriesPage {
  page: Page;
  util: Util;

  constructor(page: Page) {
    this.page = page;
    this.util = new Util(page);
  }

  async createNewRepository(repositoriesData: {
    repositoryName: string;
    repositoryDescription: string;
  }): Promise<void> {
    if (
      !(await (
        await this.util.locator(repositoriesPageSelectors.repositoryLink)
      ).isVisible())
    ) {
      await this.util.click(
        repositoriesPageSelectors.newRepositoryLink,
        repositoriesPageSelectors.repositoryNameInput,
        state.attached
      );
      await this.util.fill(
        repositoriesPageSelectors.repositoryNameInput,
        repositoriesData.repositoryName
      );
      await this.util.fill(
        repositoriesPageSelectors.repositoryDescriptionInput,
        repositoriesData.repositoryDescription
      );
      await this.util.click(
        repositoriesPageSelectors.createRepositoryButton,
        repositoriesPageSelectors.codeLink,
        state.attached
      );
      await this.gotoRepositoriesPage();
    }
  }

  async deleteRepository(
    userName: string,
    repositoryName: string
  ): Promise<void> {
    await this.util.click(
      repositoriesPageSelectors.repositoryLink,
      repositoriesPageSelectors.settingLink,
      state.attached
    );
    await this.util.click(
      repositoriesPageSelectors.settingLink,
      repositoriesPageSelectors.deleteRepositoryButton,
      state.attached
    );
    await this.util.click(
      repositoriesPageSelectors.deleteRepositoryButton,
      repositoriesPageSelectors.verifyDeleteInput,
      state.attached
    );
    await this.util.fill(
      repositoriesPageSelectors.verifyDeleteInput,
      userName + "/" + repositoryName
    );
    await this.util.click(
      repositoriesPageSelectors.confirmDeleteButton,
      repositoriesPageSelectors.deleteConfirmedAlert,
      state.attached
    );
  }

  async getNumberOfRepositories(): Promise<number> {
    let counter = await (
      await this.util.locator(
        repositoriesPageSelectors.repositoriesCounter
      )
    ).innerText();
    return +counter;
  }

  async gotoRepositoriesPage(): Promise<void> {
    await this.util.click(
      homePageSelectors.viewProfileMenuButton,
      homePageSelectors.yourProfileDropDownMenuItem,
      state.attached
    );
    await this.util.click(
      homePageSelectors.yourRepositoriesDropDownMenuItem,
      repositoriesPageSelectors.searchRepositoryInput,
      state.attached
    );
  }
}
