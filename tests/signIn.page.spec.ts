import { test, expect, Page } from '@playwright/test';
import { homePage } from '../pages/home.page';
import { mainPage } from '../pages/main.page';
import { signInPage } from '../pages/signIn.page';


test.describe('Sign in', async () => {
  let page: Page;
  let main: mainPage;
  let signIn: signInPage;
  let home: homePage;

  test.beforeEach(async ({browser}) => {
    page = await browser.newPage();
    main = new mainPage(page);
    signIn = new signInPage(page);
    home = new homePage(page);
  });

  test('sign in', async () => {
    await main.gotoSignInPage();
    await signIn.signInUser();
    await expect(home.navigationMenu).toBeVisible();
    await page.context().storageState({ path: 'storageState.json' });
  });

  test.afterEach(async ({page}) => {
    await page.close();
  });

});





