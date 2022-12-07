import { test, expect, Page, BrowserContext } from "@playwright/test";
import { repositoriesData } from "../data/repositories.data";
import { userData } from "../data/user.data";
import { homePage } from "../pages/home.page";
import { profilePage } from "../pages/profile.page";
import { repositoriesPage } from "../pages/repositories.page";
import { Util } from "../utils/util";
import { signInPage } from "../pages/signIn.page";
import { repositoriesPageSelectors } from "../selectors/repositoriesPage.selectors";
import { projectsPage } from "../pages/projects.page";
import { projectsPageSelectors } from "../selectors/projectsPage.selectors";
import { projectsData } from "../data/projects.data";

test.describe.parallel("Projects", async () => {
  let page: Page;
  let signin: signInPage;
  let home: homePage;
  let profile: profilePage;
  let projects: projectsPage;
  let util: Util;

  test.beforeEach(async ({ context }) => {
    page = await context.newPage();
    signin = new signInPage(page);
    home = new homePage(page);
    profile = new profilePage(page);
    projects = new projectsPage(page);
    util = new Util(page);
    await signin.gotoSignInPage();
    await home.gotoProfilePage();
    await profile.gotoProjectsPage();
  });

  test("Create New Project", async () => {
    await projects.createNewProject();
    await expect(
      await util.locator(projectsPageSelectors.projectNameLabel)
    ).toBeVisible();
  });

  test("Delete Project", async () => {
    await projects.deleteProject(
        projectsData.project.projectName
    );
    await expect(
      await util.LocateElementByText(projectsData.project.projectName)
    ).not.toBeVisible();
  });

  test.afterEach(async () => {
    await page.close();
  });

  // test.afterAll(async ({browser, context}) => {
  //   await context.close();
  //   await browser.close();
  // });
});
