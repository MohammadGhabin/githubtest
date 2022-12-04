import { Locator, Page } from "@playwright/test"
import { userData } from "../data/user.data";
import { homePageSelectors } from "../selectors/homePage.selectors";
import { signInPageSelectors } from "../selectors/signInPage.selectors";
import { Util } from "../utils/util";
import { base } from "./base.page";

export class signInPage implements base{
    page: Page;
    util: Util;
    userName: Locator;
    password: Locator;
    signInButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.util = new Util(page);
        this.userName = this.page.locator(signInPageSelectors.userName);
        this.password = this.page.locator(signInPageSelectors.password);
        this.signInButton = this.page.locator(signInPageSelectors.signInButton);
    }

    async signInUser(): Promise<void>{
        await this.userName.fill(userData.email);
        await this.password.fill(userData.password);
        await this.util.click(this.signInButton, homePageSelectors.navigationMenu, 'attached');
    }
}