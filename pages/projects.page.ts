import { Page } from "@playwright/test";
import { projectsData } from "../data/projects.data";
import { state } from "../data/state";
import { homePageSelectors } from "../selectors/homePage.selectors";
import { projectsPageSelectors } from "../selectors/projectsPage.selectors";
import { Util } from "../utils/util";

export class projectsPage {
  page: Page;
  util: Util;

  constructor(page: Page) {
    this.page = page;
    this.util = new Util(page);
  }

  async createNewProject(): Promise<void> {
      await this.util.click(
        projectsPageSelectors.newProjectButton,
        projectsPageSelectors.createButton,
        state.attached
      );
      await this.util.click(
        projectsPageSelectors.createButton,
        projectsPageSelectors.renameProject,
        state.attached
      );
      //await this.page.locator(projectsPageSelectors.renameProject).selectText.apply(projectsData.project.projectName);
      await this.util.fill(projectsPageSelectors.renameProject, projectsData.project.projectName);
  }

  async deleteProject(projectName: string): Promise<void> {
    await this.util.clickTextLocator(
      projectName,
      projectsPageSelectors.moreOptionsButton,
      state.attached
    );
    await this.util.click(
      projectsPageSelectors.moreOptionsButton,
      projectsPageSelectors.projectSettingLink,
      state.attached
    );
    await this.util.click(
      projectsPageSelectors.projectSettingLink,
      projectsPageSelectors.deleteProjectButton,
      state.attached
    );
    await this.util.click(
      projectsPageSelectors.deleteProjectButton,
      projectsPageSelectors.verifyDeleteInput,
      state.attached
    );
    await this.util.fill(
      projectsPageSelectors.verifyDeleteInput,
      projectName
    );
    await this.util.click(
      projectsPageSelectors.confirmDeleteButton,
      projectsPageSelectors.projectsView,
      state.attached
    );
  }

  async gotoProjectsPage(): Promise<void> {
    await this.util.click(
      projectsPageSelectors.projectsPageLink,
      projectsPageSelectors.projectsView,
      state.attached
    );
  }
}
