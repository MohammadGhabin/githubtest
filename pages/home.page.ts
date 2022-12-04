import { Locator, Page } from "@playwright/test"
import { commonData } from "../data/common.data";
import { homePageSelectors } from "../selectors/homePage.selectors";
import { profilePageSelectors } from "../selectors/profilePage.selectors";
import { Util } from "../utils/util";
import { base } from "./base.page";

export class homePage implements base{
    page: Page;
    util: Util;
    navigationMenu: Locator;
    viewProfileMenuButton: Locator;
    yourProfileDropDownMenuItem: Locator;

    constructor(page: Page){
        this.page = page;
        this.util = new Util(page);
        this.navigationMenu = this.page.locator(homePageSelectors.navigationMenu);
        this.viewProfileMenuButton = this.page.locator(homePageSelectors.viewProfileMenuButton);
        this.yourProfileDropDownMenuItem = this.page.locator(homePageSelectors.yourProfileDropDownMenuItem);
    }
    
    async gotoHomePage(): Promise<void> {
        await this.util.goto(commonData.githubUrl);
    }

    async gotoProfilePage(): Promise<void> {
        await this.gotoHomePage();
        await this.util.click(this.viewProfileMenuButton, homePageSelectors.yourProfileDropDownMenuItem, 'attached');
        await this.util.click(this.yourProfileDropDownMenuItem, profilePageSelectors.ContributionActivityView, 'attached');
    }
}