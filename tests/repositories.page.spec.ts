import { test, expect, Page, BrowserContext, Browser } from '@playwright/test';
import { repositoriesCommon } from '../data/repositories.data';
import { homePage } from '../pages/home.page';
import { profilePage } from '../pages/profile.page';
import { repositoriesPage } from '../pages/repositories.page';
import { repositoryPage } from '../pages/repository.page';


test.describe('Repositories', async () => {
  let page: Page;
  let context: BrowserContext;
  let home: homePage;
  let profile: profilePage;
  let repositories: repositoriesPage;
  let repository: repositoryPage;

  test.beforeAll(async ({browser}) => {
    context = await browser.newContext({ storageState: 'storageState.json' });
  });

  test.beforeEach(async () => {  
    page = await context.newPage();
    home = new homePage(page);
    profile = new profilePage(page);
    repositories = new repositoriesPage(page);
    repository = new repositoryPage(page);
  });

  test('Create New Repository', async () => {
    await home.gotoProfilePage();
    await profile.gotoRepositoriesPage();
    await repositories.createNewRepository(repositoriesCommon.repositoryName1, repositoriesCommon.repositoryDescription1);
    await expect(repository.repositoryNavMenu).toBeVisible();
  });

  test(' Create & Delete Repository', async () => {
    await home.gotoProfilePage();
    await profile.gotoRepositoriesPage();
    await repositories.createNewRepository(repositoriesCommon.repositoryName2, repositoriesCommon.repositoryDescription1);
    await repository.deleteRepository(repositoriesCommon.repositoryName2);
    await expect(repository.deleteConfirmedAlert).toContainText('was successfully deleted.');
  });

  test.afterEach(async () => {
    await page.close();
  })

  test.afterAll(async ({browser}) => {
    await context.close();
    await browser.close();
  });

});





