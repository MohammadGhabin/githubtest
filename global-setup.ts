// global-setup.ts
import { chromium, FullConfig } from "@playwright/test";
import { state } from "./data/state";
import { userData } from "./data/user.data";
import { homePageSelectors } from "./selectors/homePage.selectors";
import { signInPageSelectors } from "./selectors/signInPage.selectors";
import { Util } from "./utils/util";

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const util = new Util(page);
  await page.goto(baseURL!);
  await util.click(
    signInPageSelectors.signInLink,
    signInPageSelectors.signInForm,
    state.attached
  );
  await util.fill(signInPageSelectors.userName, userData.user1.email);
  await util.fill(signInPageSelectors.password, userData.user1.password);
  await util.click(
    signInPageSelectors.signInButton,
    homePageSelectors.navigationMenu,
    state.attached
  );
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;
