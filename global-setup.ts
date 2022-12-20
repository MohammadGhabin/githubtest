// global-setup.ts
import { chromium, FullConfig, request } from "@playwright/test";
import { userData } from "./data/user.data";
import { signInPage } from "./pages/signIn.page";
//import * as fs from "fs";
//import { commonData } from "./data/common.data";
import { Util } from "./utils/util";
import { signInPageSelectors } from "./selectors/signInPage.selectors";

async function globalSetup(config: FullConfig) {
  /*
  const requestContext = await request.newContext();
  const response = await requestContext.get(
    "https://api.jsonbin.io/v3/b/639ec82ddfc68e59d56b29bc",
    {
      headers: {
        "X-ACCESS-KEY":
          "$2b$10$c1bjs8RhM6QHo4qLpsmdSe3vEM7KFrkpeqXfL1YCwUTtzW4P5N7zS",
      },
      timeout: 3000,
    }
  );

  if (response.ok()) {
    var json = await (await response.json())?.record;
    await fs.writeFile("storageState.json", JSON.stringify(json), (error) => {
      if (error) {
        console.log("An error has occurred ", error);
        return;
      }
      console.log("Data written successfully to json file");
    });
  }
  
  const browser = await chromium.launch();
  const context = await browser.newContext({
    storageState: commonData.storageState,
  });
  const page = await context.newPage();
  const signin = await new signInPage(page);
  const util = await new Util(page);
  await signin.gotoSignInPage();
  if (await (await util.locator(signInPageSelectors.signInLink)).isVisible()) {
    await signin.signInUser(userData.user2);
    const { storageState } = config.projects[0].use;
    await page.context().storageState({ path: storageState as string });
  }
  await page.close();
  */
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const signin = await new signInPage(page);
  const util = await new Util(page);
  await signin.gotoSignInPage();
  if (await (await util.locator(signInPageSelectors.signInLink)).isVisible()) {
    await signin.signInUser(userData.user2);
    const { storageState } = config.projects[0].use;
    await page.context().storageState({ path: storageState as string });
  }
  await page.close();
}

export default globalSetup;
