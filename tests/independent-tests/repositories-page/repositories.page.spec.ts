import { test, expect, Page } from "@playwright/test";
import { userData } from "../../../data/user.data";
import { homePage } from "../../../pages/home.page";
import { profilePage } from "../../../pages/profile.page";
import { repositoriesPage } from "../../../pages/repositories.page";
import { Util } from "../../../utils/util";
import { signInPage } from "../../../pages/signIn.page";
import { repositoriesPageSelectors } from "../../../selectors/repositoriesPage.selectors";
import { repositoriesData } from "../../../data/repositories.data";

test.describe.parallel("Repositories", async () => {
  let page: Page;
  let signin: signInPage;
  let home: homePage;
  let profile: profilePage;
  let repositories: repositoriesPage;
  let util: Util;

  test.beforeEach(async ({ context }) => {
    page = await context.newPage();
    signin = new signInPage(page);
    home = new homePage(page);
    profile = new profilePage(page);
    repositories = new repositoriesPage(page);
    util = new Util(page);
    await signin.gotoSignInPage();
    await home.gotoProfilePage();
    await profile.gotoRepositoriesPage();
  });

  test("Create New Repository", async () => {
    await repositories.createNewRepository(repositoriesData.repository);
    await expect(
      await util.locator(repositoriesPageSelectors.repositoryLink)
    ).toBeVisible();
  });

  test("Delete Repository", async () => {
    await repositories.createNewRepository(repositoriesData.repository);
    await repositories.deleteRepository(
      userData.user2.userName,
      repositoriesData.repository.repositoryName
    );
    await expect(
      await (
        await util.locator(repositoriesPageSelectors.repositoryLink)
      ).isVisible()
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
