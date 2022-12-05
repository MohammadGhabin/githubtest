import { test, expect, Page, BrowserContext, Browser } from '@playwright/test';
import { repositoriesData } from '../data/repositories.data';
import { userData } from '../data/user.data';
import { homePage } from '../pages/home.page';
import { profilePage } from '../pages/profile.page';
import { repositoriesPage } from '../pages/repositories.page';
import { repositoriesPageSelectors } from '../selectors/repositoriesPage.selectors';
import { Util } from '../utils/util';
import {v4 as uuidv4} from 'uuid';

test.describe('Repositories', async () => {
  let page: Page;
  let context: BrowserContext;
  let home: homePage;
  let profile: profilePage;
  let repositories: repositoriesPage;
  let util: Util;
  let uuid = uuidv4();

  test.beforeAll(async ({browser}) => {
    context = await browser.newContext({ storageState: 'storageState.json' });
  });

  test.beforeEach(async () => {  
    page = await context.newPage();
    home = new homePage(page);
    profile = new profilePage(page);
    repositories = new repositoriesPage(page);
    util = new Util(page);
    await home.gotoHomePage();
    await home.gotoProfilePage();
    await profile.gotoRepositoriesPage();
  });

  test('Create New Repository', async () => {
    let repositoriesCounter =  await repositories.getNumberOfRepositories();
    await repositories.createNewRepository(repositoriesData.repository);
    await new Promise(r => setTimeout(r, 2000));
    await repositories.gotoRepositoriesPage();
    let newRepositoriesCounter = await repositories.getNumberOfRepositories();
    await expect(newRepositoriesCounter).toBe(repositoriesCounter+1);
  });

  test('Delete Repository', async () => {
    await repositories.createNewRepository(repositoriesData.repository);
    await repositories.deleteRepository(userData.user1.userName, repositoriesData.repository.repositoryName);
  });

  test.afterEach(async () => {
    await page.close();
  })

  test.afterAll(async ({browser}) => {
    await context.close();
    await browser.close();
  });
});





