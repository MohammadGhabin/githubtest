import { Locator, Page } from "@playwright/test"
import { repositoriesCommon } from "../data/repositories.data";
import { userData } from "../data/user.data";
import { repositoryPageSelectors } from "../selectors/repositoryPage.selectors";
import { Util } from "../utils/util";
import { base } from "./base.page";

export class repositoryPage implements base{
    page: Page;
    util: Util;
    codeLink: Locator;
    repositoryNavMenu: Locator;
    deleteRepositoryButton: Locator;
    verifyDeleteInput: Locator;
    confirmDeleteButton: Locator;
    sudoPasswordInput: Locator;
    confirmPasswordButton: Locator;
    deleteConfirmedAlert: Locator;
    settingLink: Locator;

    constructor(page: Page){
        this.page = page;
        this.util = new Util(page);
        this.codeLink = this.page.locator(repositoryPageSelectors.codeLink);
        this.repositoryNavMenu = this.page.locator(repositoryPageSelectors.repositoryNavMenu);
        this.settingLink = this.page.locator(repositoryPageSelectors.settingLink);
        this.deleteRepositoryButton = this.page.locator(repositoryPageSelectors.deleteRepositoryButton);
        this.verifyDeleteInput = this.page.locator(repositoryPageSelectors.verifyDeleteInput);
        this.confirmDeleteButton = this.page.locator(repositoryPageSelectors.confirmDeleteButton);
        this.sudoPasswordInput = this.page.locator(repositoryPageSelectors.sudoPasswordInput);
        this.confirmPasswordButton = this.page.locator(repositoryPageSelectors.confirmPasswordButton);
        this.deleteConfirmedAlert = this.page.locator(repositoryPageSelectors.deleteConfirmedAlert);
    }

    async deleteRepository(repositoryName: string): Promise<void>{
        await this.util.click(this.settingLink, repositoryPageSelectors.deleteRepositoryButton, 'attached');
        await this.util.click(this.deleteRepositoryButton, repositoryPageSelectors.verifyDeleteInput, 'attached');
        await this.verifyDeleteInput.fill(userData.userName + '/' + repositoryName);
        await this.util.click(this.confirmDeleteButton,  repositoryPageSelectors.deleteConfirmedAlert || repositoryPageSelectors.sudoPasswordInput, 'attached');
        if(await this.sudoPasswordInput.isVisible()){
            await this.sudoPasswordInput.fill(userData.password);
            await this.util.click(this.confirmPasswordButton, repositoryPageSelectors.deleteConfirmedAlert, 'attached');
        }
    }
}