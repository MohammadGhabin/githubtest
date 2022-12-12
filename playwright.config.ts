import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
import { commonData } from "./data/common.data";

const config: PlaywrightTestConfig = {
  testDir: "./tests",
  timeout: 60000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 0,
  workers: process.env.CI ? 2 : undefined,
  maxFailures: process.env.CI ? 5 : undefined,
  reporter: "html",
  testMatch: "*.page.spec.ts",
  use: {
    viewport: { width: 1280, height: 720 },
    trace: "on-first-retry",
    video: "on-first-retry",
    screenshot: "only-on-failure",
  },

  globalSetup: require.resolve("./global-setup"),

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      testMatch: /.*.page.spec.ts/,
      use: {
        baseURL: commonData.githubUrl,
        storageState: commonData.storageState,
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "webkit",
      testMatch: /.*.page.spec.ts/,
      use: {
        baseURL: commonData.githubUrl,
        storageState: commonData.storageState,
        ...devices["Desktop Safari"],
      },
    },
    {
      name: "Microsoft Edge",
      testMatch: /.*.page.spec.ts/,
      use: {
        baseURL: commonData.githubUrl,
        storageState: commonData.storageState,
        channel: "msedge",
      },
    },
  ],
};

export default config;
