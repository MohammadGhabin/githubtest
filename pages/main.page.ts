import { Locator, Page } from "@playwright/test"
import { commonData } from "../data/common.data";
import { mainPageSelectors } from "../selectors/mainPage.selectors";
import { signInPageSelectors } from "../selectors/signInPage.selectors";
import { Util } from "../utils/util";
import { base } from "./base.page";

export class mainPage implements base{
    page: Page;
    util: Util;
    signInLink: Locator;

    constructor(page: Page){
        this.page = page;
        this.util = new Util(page);
        this.signInLink = this.page.locator(mainPageSelectors.signInLink);
    }
    
    async gotoMainPage(): Promise<void> {
        await this.util.goto(commonData.githubUrl);
    }

    async gotoSignInPage(): Promise<void> {
        await this.gotoMainPage();
        await this.page.waitForSelector(mainPageSelectors.signInLink);
        await this.util.click(this.signInLink, signInPageSelectors.signInForm, "attached");
    }
}