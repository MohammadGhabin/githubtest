import { Locator, Page } from "@playwright/test"
import { profilePageSelectors } from "../selectors/profilePage.selectors";
import { repositoriesPageSelectors } from "../selectors/repositoriesPage.selectors";
import { Util } from "../utils/util";
import { base } from "./base.page";

export class profilePage implements base{
    page: Page;
    util: Util;
    repositoriesButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.util = new Util(page);
        this.repositoriesButton = this.page.locator(profilePageSelectors.repositoriesButton).first();
    }

    async gotoRepositoriesPage(): Promise<void> {
        await this.util.click(this.repositoriesButton, repositoriesPageSelectors.searchRepositoryInput, 'attached');
    }
}