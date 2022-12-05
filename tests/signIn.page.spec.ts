import { test, expect, Page, BrowserContext, Browser } from '@playwright/test';
import { userData } from '../data/user.data';
import { homePage } from '../pages/home.page';
import { signInPage } from '../pages/signIn.page';
import { homePageSelectors } from '../selectors/homePage.selectors';
import { Util } from '../utils/util';


test.describe('Sign in', async () => {
  let page: Page;
  let context: BrowserContext;
  let signIn: signInPage;
  let home: homePage;
  let util: Util; // temporary using util in test

  test.beforeAll(async ({browser}) => {
    context = await browser.newContext();
  })

  test.beforeEach(async () => {
    page = await context.newPage();
    signIn = new signInPage(page);
    home = new homePage(page);
    util = new Util(page); // temporary using util in test
  });

  test('sign in', async () => {
    await signIn.gotoSignInPage();
    await signIn.signInUser(userData.user1);
    await expect(await util.locator(homePageSelectors.navigationMenu)).toBeVisible(); // temporary using util in test
  });

  test.afterEach(async ({page}) => {
    await page.close();
  });

  test.afterAll(async ({browser}) => {
    await context.close();
    await browser.close();
  })

});





