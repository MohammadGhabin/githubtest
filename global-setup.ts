// global-setup.ts
import { chromium, FullConfig, request } from "@playwright/test";
import { userData } from "./data/user.data";
import { signInPage } from "./pages/signIn.page";
import * as fs from "fs";

async function globalSetup(config: FullConfig) {
  const requestContext = await request.newContext();
  const response = await requestContext.get(
    "https://api.jsonbin.io/v3/b/639ec82ddfc68e59d56b29bc",
    {
      headers: {
        "X-Master-Key":
          "$2b$10$c1bjs8RhM6QHo4qLpsmdSe3vEM7KFrkpeqXfL1YCwUTtzW4P5N7zS",
      },
      timeout: 2000,
    }
  );
  if (response.ok()) {
    var json = JSON.stringify(response.text);
    fs.writeFile("storageState.json", json, "utf8", function (error) {
      if (error) throw error;
    });
  } else {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const signin = new signInPage(page);
    await signin.gotoSignInPage();
    await signin.signInUser(userData.user2);
    const { storageState } = config.projects[0].use;
    await page.context().storageState({ path: storageState as string });
    await page.close();
  }
}

export default globalSetup;
