import { test, expect, Page } from "@playwright/test";
import { homePage } from "../../../pages/home.page";
import { profilePage } from "../../../pages/profile.page";
import { Util } from "../../../utils/util";
import { signInPage } from "../../../pages/signIn.page";
import { projectsPage } from "../../../pages/projects.page";
import { projectsData } from "../../../data/projects.data";

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
    const projectName = projectsData.projectName;
    await projects.createNewProject(projectName);
    await expect(await util.LocateElementByText(projectName)).toBeVisible();
  });

  test("Delete Project", async () => {
    const projectName = projectsData.projectName;
    await projects.deleteProject(projectName);
    await expect(
      !(await (await util.LocateElementByText(projectName)).isVisible())
    ).toBeFalsy();
  });

  test.afterEach(async () => {
    await page.close();
  });

  // test.afterAll(async ({browser, context}) => {
  //   await context.close();
  //   await browser.close();
  // });
});
