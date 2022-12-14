import { userData } from "../data/user.data";

export const projectsPageSelectors = {
  projectsView: "#memexes-results",
  newProjectButton: '[aria-label="Create a new project"]',
  createButton: ".gtbLNH",
  renameProject: '[aria-label*="Rename"]',
  moreOptionsButton: '[aria-label*="More options"]',
  projectSettingLink: '[data-test-id="project-settings-button"]',
  projectNameInput: '[aria-labelledby*="project-name"]',
  deleteProjectButton: '[data-test-id="delete-project-button"]',
  verifyDeleteInput: 'input[aria-label*="delete"]',
  confirmDeleteButton: ".gtbLNH",
  projectsPageLink: `[href="/users/${userData.user2.userName}/projects"]`,
};
