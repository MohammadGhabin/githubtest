import { Page } from "@playwright/test";
import { projectsPageSelectors } from "../selectors/projectsPage.selectors";
import { Util } from "../utils/util";
export class projectsPage {
  page: Page;
  util: Util;

  constructor(page: Page) {
    this.page = page;
    this.util = new Util(page);
  }

  async createNewProject(projectName: string): Promise<void> {
    await this.util.reload();
    if (
      !(await (await this.util.LocateElementByText(projectName)).isVisible())
    ) {
      await this.util.click(
        projectsPageSelectors.newProjectButton,
        projectsPageSelectors.createButton
      );
      await this.util.waitForSelector(projectsPageSelectors.createButton);

      await this.util.click(
        projectsPageSelectors.createButton,
        projectsPageSelectors.renameProject
      );
      await this.util.waitForSelector(projectsPageSelectors.renameProject);

      await this.util.KeyboardType(
        projectsPageSelectors.renameProject,
        projectName
      );
      await this.util.click(
        projectsPageSelectors.projectsPageLink,
        projectsPageSelectors.projectsView
      );
      await this.util.waitForSelector(projectsPageSelectors.projectsView);
    }
  }

  async deleteProject(projectName: string): Promise<void> {
    if (
      !(await (await this.util.LocateElementByText(projectName)).isVisible())
    ) {
      await this.createNewProject(projectName);
    }

    await this.util.clickTextLocator(
      projectName,
      projectsPageSelectors.moreOptionsButton
    );
    await this.util.waitForSelector(projectsPageSelectors.moreOptionsButton);

    await this.util.click(
      projectsPageSelectors.moreOptionsButton,
      projectsPageSelectors.projectSettingLink
    );
    await this.util.waitForSelector(projectsPageSelectors.projectSettingLink);

    await this.util.click(
      projectsPageSelectors.projectSettingLink,
      projectsPageSelectors.deleteProjectButton
    );
    await this.util.waitForSelector(projectsPageSelectors.deleteProjectButton);

    await this.util.click(
      projectsPageSelectors.deleteProjectButton,
      projectsPageSelectors.verifyDeleteInput
    );
    await this.util.waitForSelector(projectsPageSelectors.verifyDeleteInput);

    await this.util.fill(projectsPageSelectors.verifyDeleteInput, projectName);
    await this.util.waitForSelector(projectsPageSelectors.confirmDeleteButton);

    await this.util.click(
      projectsPageSelectors.confirmDeleteButton,
      projectsPageSelectors.projectsView
    );
    await this.util.waitForSelector(projectsPageSelectors.projectsView);
  }

  async gotoProjectsPage(): Promise<void> {
    await this.util.click(
      projectsPageSelectors.projectsPageLink,
      projectsPageSelectors.projectsView
    );
    await this.util.waitForSelector(projectsPageSelectors.projectsView);
  }
}
