import { test, expect, Page, BrowserContext, Browser } from '@playwright/test';
import { userData } from '../data/user.data';
import { signInPage } from '../pages/signIn.page';
import { homePageSelectors } from '../selectors/homePage.selectors';
import { Util } from '../utils/util';

test.describe('Sign-in & Sign-out', async () => {
  let page: Page;
  let context: BrowserContext;
  let signIn: signInPage;
  let util: Util;

  test.beforeAll(async ({browser}) => {
    context = await browser.newContext();
    page = await context.newPage();
    signIn = new signInPage(page);
    util = new Util(page); 
  });

  test('sign in', async () => {
    await signIn.gotoSignInPage();
    await signIn.signOutUser();
    await signIn.signInUser(userData.user1);
    await expect(await util.locator(homePageSelectors.navigationMenu)).toBeVisible(); 
  });

  test.afterAll(async ({browser}) => {
    await page.close();
    await context.close();
    await browser.close();
  })

});





