import { Page } from "@playwright/test"
import { commonData } from "../data/common.data";
import { state } from "../data/state";
import { homePageSelectors } from "../selectors/homePage.selectors";
import { signInPageSelectors } from "../selectors/signInPage.selectors";
import { Util } from "../utils/util";

export class signInPage{
    page: Page;
    util: Util;

    constructor(page: Page){
        this.page = page;
        this.util = new Util(page);
    }

    // return true if already signed in, else return false and go to sign in page.
    async gotoSignInPage(): Promise<boolean> {
        await this.util.goto(commonData.githubUrl);
        if(await (await this.util.locator(signInPageSelectors.signInLink)).isVisible()){
            await this.util.click(signInPageSelectors.signInLink, signInPageSelectors.signInForm, state.attached);
            return false;
        }

        return true;
    }

    async signInUser(user: { userName: string, email: string; password: string; }): Promise<void>{
        await this.util.fill(signInPageSelectors.userName, user.email);
        await this.util.fill(signInPageSelectors.password, user.password);
        await this.util.click(signInPageSelectors.signInButton, homePageSelectors.navigationMenu, state.attached);
        await this.util.saveContext(commonData.storageStatePath);
    }
}