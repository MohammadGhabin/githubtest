import { Page } from "@playwright/test";
import { homePageSelectors } from "../selectors/homePage.selectors";
import { repositoriesPageSelectors } from "../selectors/repositoriesPage.selectors";
import { Util } from "../utils/util";

export class repositoriesPage {
  page: Page;
  util: Util;
  repositoryLink: string = repositoriesPageSelectors.repositoryLink;

  constructor(page: Page) {
    this.page = page;
    this.util = new Util(page);
  }

  async createNewRepository(repositoriesData: {
    repositoryName: string;
    repositoryDescription: string;
    repositoryVisibility: string;
  }): Promise<void> {
    const receivedRepositoryLink = this.repositoryLink + repositoriesData.repositoryName + '"]';
    if (
      !(await (
        await this.util.locator(receivedRepositoryLink)
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

      if (repositoriesData.repositoryVisibility == 'private') {
        await this.util.check(repositoriesPageSelectors.privateRepositoryRadioButton);
      }
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
    const receivedRepositoryLink = this.repositoryLink + repositoryName + '"]';
    await this.util.waitForSelector(receivedRepositoryLink);
    await this.util.click(
      receivedRepositoryLink,
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
    projectName: string,
    repositoryName
  ): Promise<void> {
    const receivedRepositoryLink = this.repositoryLink + repositoryName + '"]';

    await this.util.waitForSelector(receivedRepositoryLink);
    await this.util.click(
      receivedRepositoryLink,
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

  async renameRepository(repositoryName: string, newName: string): Promise<void> {
    const receivedRepositoryLink = this.repositoryLink + repositoryName + '"]';

    await this.util.waitForSelector(receivedRepositoryLink);
    await this.util.click(
      receivedRepositoryLink,
      repositoriesPageSelectors.settingLink
    );
    await this.util.waitForSelector(repositoriesPageSelectors.settingLink);

    await this.util.click(
      repositoriesPageSelectors.settingLink,
      repositoriesPageSelectors.repositoryRenameInput
    );
    await this.util.waitForSelector(
      repositoriesPageSelectors.repositoryRenameInput
    );

    await this.util.fill(repositoriesPageSelectors.repositoryRenameInput, newName);
    await this.util.waitForSelector(
      repositoriesPageSelectors.renameButton
    );
    await this.util.click(
      repositoriesPageSelectors.renameButton,
      repositoriesPageSelectors.codeLink
    );
    await this.page.once('load', () => console.log('Page loaded!'));
    await this.util.waitForSelector(repositoriesPageSelectors.codeLink);
  }

  async changeVisibility(repositoryName: string): Promise<void> {
    const receivedRepositoryLink = this.repositoryLink + repositoryName + '"]';

    await this.util.waitForSelector(receivedRepositoryLink);
    await this.util.click(
      receivedRepositoryLink,
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

    await this.util.clickTextLocator('Change visibility', repositoriesPageSelectors.changeVisibilityButton);
    await this.util.waitForSelector(
      repositoriesPageSelectors.changeVisibilityButton
    );

    await this.util.click(
      repositoriesPageSelectors.changeVisibilityButton,
      repositoriesPageSelectors.popupChangeVisibilityButton
    );
    await this.util.waitForSelector(
      repositoriesPageSelectors.popupChangeVisibilityButton
    );

    await this.util.click(
      repositoriesPageSelectors.popupChangeVisibilityButton,
      repositoriesPageSelectors.popupChangeVisibilityButton
    );
    await this.util.waitForSelector(
      repositoriesPageSelectors.popupChangeVisibilityButton
    );

    await this.util.click(
      repositoriesPageSelectors.popupChangeVisibilityButton,
      repositoriesPageSelectors.confirmChangeVisibilityButton
    );
    await this.util.waitForSelector(
      repositoriesPageSelectors.confirmChangeVisibilityButton
    );

    await this.util.click(
      repositoriesPageSelectors.confirmChangeVisibilityButton,
      repositoriesPageSelectors.visibilityLabel
    );
    await this.util.waitForSelector(
      repositoriesPageSelectors.visibilityLabel
    );
  }

  async addInitCommit(repositoryName: string): Promise<void> {
    const receivedRepositoryLink = this.repositoryLink + repositoryName + '"]';

    await this.util.waitForSelector(receivedRepositoryLink);
    await this.util.click(
      receivedRepositoryLink,
      repositoriesPageSelectors.readMeLink
    );
    await this.util.waitForSelector(repositoriesPageSelectors.readMeLink);

    await this.util.click(
      repositoriesPageSelectors.readMeLink,
      repositoriesPageSelectors.commitNewFileButton
    );
    await this.util.waitForSelector(
      repositoriesPageSelectors.commitNewFileButton
    );

    await this.util.click(
      repositoriesPageSelectors.commitNewFileButton,
      repositoriesPageSelectors.codeDropDownMenuButton
    );
    await this.util.waitForSelector(
      repositoriesPageSelectors.codeDropDownMenuButton
    );

    await this.util.click(
      repositoriesPageSelectors.codeDropDownMenuButton,
      repositoriesPageSelectors.dropDownMenuView
    );
    await this.util.waitForSelector(
      repositoriesPageSelectors.dropDownMenuView
    );

    await this.util.waitForSelector(
      repositoriesPageSelectors.cloneUrlInput
    );
  }
  
}
