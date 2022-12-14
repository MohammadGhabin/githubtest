// global-setup.ts
import { chromium, FullConfig } from "@playwright/test";
import { userData } from "./data/user.data";
import { signInPage } from "./pages/signIn.page";
import { Util } from "./utils/util";

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const util = new Util(page);
  const signin = new signInPage(page);
  await util.goto(baseURL as string);
  await signin.signInUser(userData.user2);
  await page.context().storageState({ path: storageState as string });
  await page.close();
  await context.close();
  await browser.close();
}

export default globalSetup;
