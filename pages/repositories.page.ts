import { Locator, Page } from "@playwright/test"
import { repositoriesCommon } from "../data/repositories.data";
import { profilePageSelectors } from "../selectors/profilePage.selectors";
import { repositoriesPageSelectors } from "../selectors/repositoriesPage.selectors";
import { repositoryPageSelectors } from "../selectors/repositoryPage.selectors";
import { Util } from "../utils/util";
import { base } from "./base.page";

export class repositoriesPage implements base{
    page: Page;
    util: Util;
    overviewButton: Locator;
    newRepositoryLink: Locator;
    repositoryNameInput: Locator;
    repositoryDescription: Locator;
    createRepositoryButton: Locator;
    repositoryNameLink: Locator;

    constructor(page: Page){
        this.page = page;
        this.util = new Util(page);
        this.overviewButton = this.page.locator(repositoriesPageSelectors.overviewButton);
        this.newRepositoryLink = this.page.locator(repositoriesPageSelectors.newRepositoryLink);
        this.repositoryNameInput = this.page.locator(repositoriesPageSelectors.repositoryNameInput);
        this.repositoryDescription = this.page.locator(repositoriesPageSelectors.repositoryDescriptionInput);
        this.createRepositoryButton = this.page.locator(repositoriesPageSelectors.createRepositoryButton);
    }
    
    async gotoProfilePage(): Promise<void> {
        await this.util.click(this.overviewButton, profilePageSelectors.ContributionActivityView, 'attached');
    }

    async createNewRepository(repositoryName: string, repositoryDescription: string): Promise<void>{
        await this.util.click(this.newRepositoryLink, repositoriesPageSelectors.repositoryNameInput, 'attached');
        await this.repositoryNameInput.fill(repositoryName);
        await this.repositoryDescription.fill(repositoryDescription);
        await this.util.click(this.createRepositoryButton, repositoryPageSelectors.codeLink, 'attached');
    }
}