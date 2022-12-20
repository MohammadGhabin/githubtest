import { Locator, Page, request } from "@playwright/test";

export class Util {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async reload(): Promise<void> {
    await this.page.reload();
  }

  async locator(selector: string): Promise<Locator> {
    return await this.page.locator(selector).first();
  }

  async LocateElementByText(text: string): Promise<Locator> {
    return await this.page.getByText(text).first();
  }

  async waitForSelector(
    selector: string,
    state?: "attached" | "detached" | "visible" | "hidden" | undefined
  ): Promise<void> {
    await this.page.waitForSelector(selector, {
      state: state ? state : "visible",
      timeout: 10000
    });
  }

  async click(
    selector: string,
    nextSelector: string,
    nextState?: "attached" | "detached" | "visible" | "hidden" | undefined
  ): Promise<void> {
    await (await this.locator(selector)).click();
    // await this.page.screenshot({path: 'test-results/fullPage.png', fullPage: true});
    // await console.log(await this.page.content());
    await this.waitForSelector(nextSelector, nextState ? nextState : "attached");
  }

  async clickTextLocator(
    text: string,
    nextSelector: string,
    nextState?: "attached" | "detached" | "visible" | "hidden" | undefined
  ): Promise<void> {
    await (await this.LocateElementByText(text)).click();
    await this.waitForSelector(nextSelector, nextState ? nextState : "visible");
  }

  async KeyboardType(selector: string, text: string): Promise<void> {
    await (await this.locator(selector)).click();
    await this.page.keyboard.type(text);
  }

  async fill(selector: string, value: string): Promise<void> {
    await (await this.locator(selector)).fill(value);
  }

  async check(selector: string): Promise<void> {
    await (await this.locator(selector)).check();
  }
}
