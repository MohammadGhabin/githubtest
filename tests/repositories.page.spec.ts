import { test, expect, Page, BrowserContext } from '@playwright/test';
import { repositoriesData } from '../data/repositories.data';
import { userData } from '../data/user.data';
import { homePage } from '../pages/home.page';
import { profilePage } from '../pages/profile.page';
import { repositoriesPage } from '../pages/repositories.page';
import { Util } from '../utils/util';
import { signInPage } from '../pages/signIn.page';

test.describe.parallel('Repositories', async () => {
  let page: Page;
  let context: BrowserContext;
  let signin: signInPage;
  let home: homePage;
  let profile: profilePage;
  let repositories: repositoriesPage;
  let util: Util;

  test.beforeAll(async ({browser}) => {
    context = await browser.newContext({ storageState: 'storageState.json' });
  });

  test.beforeEach(async () => {
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

  test('Create New Repository', async () => {
    let repositoriesCounter =  await repositories.getNumberOfRepositories();
    await repositories.createNewRepository(repositoriesData.repository);
    await repositories.gotoRepositoriesPage();
    let newRepositoriesCounter = await repositories.getNumberOfRepositories();
    await expect(newRepositoriesCounter).toBe(repositoriesCounter+1);
  });

  test('Delete Repository', async () => {
    await repositories.createNewRepository(repositoriesData.repository);
    const repositoriesCounter =  await repositories.getNumberOfRepositories();
    await repositories.deleteRepository(userData.user1.userName, repositoriesData.repository.repositoryName);
    const newRepositoriesCounter = await repositories.getNumberOfRepositories();
    await expect(newRepositoriesCounter).toBe(repositoriesCounter-1);
  });

  test.afterEach(async () => {
    await page.close();
  })

  test.afterAll(async ({browser}) => {
    await context.close();
    await browser.close();
  });
  
});





