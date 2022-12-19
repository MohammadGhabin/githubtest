import { Page } from "@playwright/test";
import { homePageSelectors } from "../selectors/homePage.selectors";
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
      await this.util.waitForSelector(
        repositoriesPageSelectors.newRepositoryLink
      );
      await this.util.click(
        repositoriesPageSelectors.newRepositoryLink,
        repositoriesPageSelectors.repositoryNameInput
      );
      await this.util.waitForSelector(
        repositoriesPageSelectors.repositoryNameInput
      );

      await this.util.fill(
        repositoriesPageSelectors.repositoryNameInput,
        repositoriesData.repositoryName
      );
      await this.util.fill(
        repositoriesPageSelectors.repositoryDescriptionInput,
        repositoriesData.repositoryDescription
      );
      await this.util.waitForSelector(
        repositoriesPageSelectors.createRepositoryButton
      );
      await this.util.click(
        repositoriesPageSelectors.createRepositoryButton,
        repositoriesPageSelectors.codeLink
      );
      await this.util.waitForSelector(repositoriesPageSelectors.codeLink);

      await this.gotoRepositoriesPage();
    }
  }

  async deleteRepository(
    userName: string,
    repositoryName: string
  ): Promise<void> {
    await this.util.waitForSelector(repositoriesPageSelectors.repositoryLink);
    await this.util.click(
      repositoriesPageSelectors.repositoryLink,
      repositoriesPageSelectors.settingLink
    );
    await this.util.waitForSelector(repositoriesPageSelectors.settingLink);

    await this.util.click(
      repositoriesPageSelectors.settingLink,
      repositoriesPageSelectors.deleteRepositoryButton
    );
    await this.util.waitForSelector(
      repositoriesPageSelectors.deleteRepositoryButton
    );

    await this.util.click(
      repositoriesPageSelectors.deleteRepositoryButton,
      repositoriesPageSelectors.verifyDeleteInput
    );
    await this.util.waitForSelector(
      repositoriesPageSelectors.verifyDeleteInput
    );

    await this.util.fill(
      repositoriesPageSelectors.verifyDeleteInput,
      userName + "/" + repositoryName
    );

    await this.util.waitForSelector(
      repositoriesPageSelectors.confirmDeleteButton
    );
    await this.util.click(
      repositoriesPageSelectors.confirmDeleteButton,
      repositoriesPageSelectors.deleteConfirmedAlert
    );
    await this.util.waitForSelector(
      repositoriesPageSelectors.deleteConfirmedAlert
    );
  }

  async getNumberOfRepositories(): Promise<number> {
    let counter = await (
      await this.util.locator(repositoriesPageSelectors.repositoriesCounter)
    ).innerText();
    return +counter;
  }

  async gotoRepositoriesPage(): Promise<void> {
    await this.util.waitForSelector(homePageSelectors.viewProfileMenuButton);
    await this.util.click(
      homePageSelectors.viewProfileMenuButton,
      homePageSelectors.yourProfileDropDownMenuItem
    );
    await this.util.waitForSelector(
      homePageSelectors.yourProfileDropDownMenuItem
    );
    await this.util.waitForSelector(
      homePageSelectors.yourRepositoriesDropDownMenuItem
    );

    await this.util.click(
      homePageSelectors.yourRepositoriesDropDownMenuItem,
      repositoriesPageSelectors.searchRepositoryInput
    );
    await this.util.waitForSelector(
      repositoriesPageSelectors.searchRepositoryInput
    );
  }

  async linkProjectWithRepository(
    projectName: string
  ): Promise<void> {
    await this.util.waitForSelector(repositoriesPageSelectors.repositoryLink);
    await this.util.click(
      repositoriesPageSelectors.repositoryLink,
      repositoriesPageSelectors.projectsLink
    );
    await this.util.waitForSelector(repositoriesPageSelectors.projectsLink);

    await this.util.click(
      repositoriesPageSelectors.projectsLink,
      repositoriesPageSelectors.linkProjectButton
    );
    await this.util.waitForSelector(
      repositoriesPageSelectors.linkProjectButton
    );

    await this.util.click(
      repositoriesPageSelectors.linkProjectButton,
      repositoriesPageSelectors.projectSelector
    );
    await this.util.waitForSelector(repositoriesPageSelectors.projectSelector);

    await this.util.fill(
      repositoriesPageSelectors.searchProjectInput,
      projectName
    );
    await this.util.waitForSelector(repositoriesPageSelectors.projectLink);

    await this.util.click(
      repositoriesPageSelectors.projectLink,
      repositoriesPageSelectors.linkProjectButton
    );
    await this.util.waitForSelector(
      repositoriesPageSelectors.linkProjectButton
    );
    await this.util.click(
      repositoriesPageSelectors.linkProjectButton,
      repositoriesPageSelectors.projectsSearchInput
    );
    await this.page.once('load', () => console.log('Page loaded!'));
    await this.util.waitForSelector(
      repositoriesPageSelectors.projectsSearchInput
    );
  }
}
