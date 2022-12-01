import { test, expect, Page, BrowserContext, Browser } from '@playwright/test';
import { homePage } from '../pages/home.page';
import { mainPage } from '../pages/main.page';
import { signInPage } from '../pages/signIn.page';


test.describe('Sign in', async () => {
  let page: Page;
  let context: BrowserContext;
  let main: mainPage;
  let signIn: signInPage;
  let home: homePage;

  test.beforeAll(async ({browser}) => {
    context = await browser.newContext();
  })

  test.beforeEach(async () => {
    page = await context.newPage();
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

  test.afterAll(async ({browser}) => {
    await context.close();
    await browser.close();
  })

});





