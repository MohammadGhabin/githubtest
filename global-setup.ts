// global-setup.ts
import { chromium, FullConfig } from "@playwright/test";
import { userData } from "./data/user.data";
import { signInPage } from "./pages/signIn.page";

async function globalSetup(config: FullConfig) {
  const { storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const signin = new signInPage(page);
  await signin.gotoSignInPage();
  await signin.signInUser(userData.user2);
  await page.context().storageState({ path: storageState as string });
  await page.close();
}

export default globalSetup;
