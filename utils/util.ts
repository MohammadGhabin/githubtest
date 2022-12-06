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
        return await this.page.locator(selector);
    }

    async locatorFirstMatch(selector: string): Promise<Locator>{
        return await this.page.locator(selector).first();
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
}