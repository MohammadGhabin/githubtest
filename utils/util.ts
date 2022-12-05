import {Locator, Page} from "@playwright/test"

export class Util {
    page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async goto(url: string): Promise<void>{
        await this.page.goto(url);
    }

    async locator(selector: string): Promise<Locator>{
        return this.page.locator(selector);
    }

    async click(selector: string, nextSelector: string, nextState: "attached" | "detached" | "visible" | "hidden" | undefined){
        await (await this.locator(selector)).click();
        await this.page.waitForSelector(nextSelector, {state: nextState})
    }

    async clickFirstMatch(selector: string, nextSelector: string, nextState: "attached" | "detached" | "visible" | "hidden" | undefined){
        await ((await this.locator(selector)).first()).click();
        await this.page.waitForSelector(nextSelector, {state: nextState})
    }

    async fill(selector: string, value: string){
        await (await this.locator(selector)).fill(value);
    }

    async saveContext(contextPath: string){
        await this.page.context().storageState({ path: contextPath });
    }
}