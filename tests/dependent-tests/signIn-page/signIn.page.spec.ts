import { test, expect, Page, FullConfig } from "@playwright/test";
import { userData } from "../../../data/user.data";
import { signInPage } from "../../../pages/signIn.page";
import { homePageSelectors } from "../../../selectors/homePage.selectors";
import { signInPageSelectors } from "../../../selectors/signInPage.selectors";
import { Util } from "../../../utils/util";

test.describe.serial("Sign-in & Sign-out", async () => {
  let page: Page;
  let signIn: signInPage;
  let util: Util;
  let config: FullConfig;

  test.beforeEach(async ({ context }) => {
    page = await context.newPage();
    signIn = new signInPage(page);
    util = new Util(page);
    await signIn.gotoSignInPage();
  });

  test("sign out", async () => {
    await signIn.signOutUser();
    await expect(
      await util.locator(signInPageSelectors.globalNavMenu)
    ).toBeVisible();
  });

  test("sign in", async () => {
    await signIn.signInUser(userData.user2);
    await expect(
      await util.locator(homePageSelectors.navigationMenu)
    ).toBeVisible();
  });

  test.afterEach(async () => {
    await page.close();
  });
});
