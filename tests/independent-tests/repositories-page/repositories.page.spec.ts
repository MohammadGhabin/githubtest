import { test, expect, Page } from "@playwright/test";
import { userData } from "../../../data/user.data";
import { homePage } from "../../../pages/home.page";
import { profilePage } from "../../../pages/profile.page";
import { repositoriesPage } from "../../../pages/repositories.page";
import { Util } from "../../../utils/util";
import { signInPage } from "../../../pages/signIn.page";
import { repositoriesPageSelectors } from "../../../selectors/repositoriesPage.selectors";
import { repositoriesData } from "../../../data/repositories.data";
import { projectsPage } from "../../../pages/projects.page";
import { projectsData } from "../../../data/projects.data";
import { v4 as uuidv4 } from "uuid";

test.describe.parallel("Repositories", async () => {
  let page: Page;
  let signin: signInPage;
  let home: homePage;
  let profile: profilePage;
  let repositories: repositoriesPage;
  let projects: projectsPage;
  let util: Util;

  test.beforeEach(async ({ context }) => {
    page = await context.newPage();
    signin = new signInPage(page);
    home = new homePage(page);
    profile = new profilePage(page);
    repositories = new repositoriesPage(page);
    projects = new projectsPage(page);
    util = new Util(page);
    await signin.gotoSignInPage();
    await home.gotoProfilePage();
    await profile.gotoRepositoriesPage();
  });

  test("Create New Repository", async () => {
    const repo = repositoriesData;
    repo.repositoryName += uuidv4();
    await repositories.createNewRepository(repo);
    await expect(
      await util.locator(
        repositoriesPageSelectors.repositoryLink + repo.repositoryName + '"]'
      )
    ).toBeVisible();
  });

  test("Delete Repository", async () => {
    const repo = repositoriesData;
    repo.repositoryName += uuidv4();
    await repositories.createNewRepository(repo);
    await repositories.deleteRepository(
      userData.user2.userName,
      repo.repositoryName
    );
    await expect(
      await (
        await util.locator(
          repositoriesPageSelectors.repositoryLink + repo.repositoryName + '"]'
        )
      ).isVisible()
    ).toBeFalsy();
  });

  test("Link Project", async () => {
    const repo = repositoriesData;
    repo.repositoryName += uuidv4();
    const projectName = projectsData.projectName + uuidv4();
    await repositories.createNewRepository(repo);
    await profile.gotoProjectsPage();
    await projects.createNewProject(projectName);
    await profile.gotoRepositoriesPage();
    await repositories.linkProjectWithRepository(
      projectName,
      repo.repositoryName
    );
    await expect(
      await (await util.LocateElementByText(projectName)).isVisible()
    ).toBeTruthy();
  });

  test("Rename Repository", async () => {
    const repo = repositoriesData;
    repo.repositoryName += uuidv4();
    const newRepositoryName = uuidv4();
    await repositories.createNewRepository(repo);
    await repositories.renameRepository(repo.repositoryName, newRepositoryName);
    await expect(page).toHaveURL(new RegExp(newRepositoryName));
  });

  test("Change Visibility", async () => {
    const publicRepo = repositoriesData;
    publicRepo.repositoryName += uuidv4();
    await repositories.createNewRepository(publicRepo);
    await repositories.changeVisibility(publicRepo.repositoryName);
    const privateVisibility = await (
      await util.locator(repositoriesPageSelectors.visibilityLabel)
    ).innerText();
    await repositories.gotoRepositoriesPage();
    await repositories.changeVisibility(publicRepo.repositoryName);
    const publicVisibility = await (
      await util.locator(repositoriesPageSelectors.visibilityLabel)
    ).innerText();
    await expect(privateVisibility).toBe("Private");
    await expect(publicVisibility).toBe("Public");
  });

  test("Clone Repository", async () => {
    const repo = repositoriesData;
    repo.repositoryName += uuidv4();
    const cloneUrl =
      "https://github.com/" +
      userData.user2.userName +
      "/" +
      repo.repositoryName +
      ".git";
    await repositories.createNewRepository(repo);
    await repositories.addInitCommit(repo.repositoryName);
    await expect(
      await (
        await util.locator(repositoriesPageSelectors.cloneUrlInput)
      ).inputValue()
    ).toBe(cloneUrl);
  });

  test.afterEach(async () => {
    await page.close();
  });
});
