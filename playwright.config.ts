import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./tests",
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    actionTimeout: 0,
    trace: "on-first-retry",
  },

  globalSetup: require.resolve("./global-setup"),

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        baseURL: "https://github.com/",
        storageState: "storageState.json",
        ...devices["Desktop Chrome"],
      },
    },
  ],
};

export default config;
