import { test, expect, Page, BrowserContext, Browser } from '@playwright/test';
import { repositoriesData } from '../data/repositories.data';
import { userData } from '../data/user.data';
import { homePage } from '../pages/home.page';
import { profilePage } from '../pages/profile.page';
import { repositoriesPage } from '../pages/repositories.page';
import { repositoriesPageSelectors } from '../selectors/repositoriesPage.selectors';
import { Util } from '../utils/util';


test.describe('Repositories', async () => {
  let page: Page;
  let context: BrowserContext;
  let home: homePage;
  let profile: profilePage;
  let repositories: repositoriesPage;
  let util: Util;

  test.beforeAll(async ({browser}) => {
    context = await browser.newContext({ storageState: 'storageState.json' });
  });

  test.beforeEach(async () => {  
    page = await context.newPage();
    home = new homePage(page);
    profile = new profilePage(page);
    repositories = new repositoriesPage(page);
    util = new Util(page);
    await home.gotoProfilePage();
    await profile.gotoRepositoriesPage();
  });

  test('Create New Repository', async () => {
    await repositories.createNewRepository(repositoriesData.repository1);
    await expect(await util.locator(repositoriesPageSelectors.repositoryNavMenu)).toBeVisible();
  });

  test('Delete Repository', async () => {
    await repositories.deleteRepository(userData.user1.userName, repositoriesData.repository1.repositoryName);
    await expect(await util.locator(repositoriesPageSelectors.deleteConfirmedAlert)).toContainText('was successfully deleted.');
  });

  test.afterEach(async () => {
    await page.close();
  })

  test.afterAll(async ({browser}) => {
    await context.close();
    await browser.close();
  });
});





