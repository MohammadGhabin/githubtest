import {Locator, Page} from "@playwright/test"

export class Util {
    page: Page;
    
    constructor(page: Page){
        this.page = page;
    }

    async goto(url: string): Promise<void>{
        await this.page.goto(url);
    }

    async click(locator: Locator, selector: string, nextState: "attached" | "detached" | "visible" | "hidden" | undefined){
        await locator.click();
        await this.page.waitForSelector(selector, {state: nextState})
    }
}
