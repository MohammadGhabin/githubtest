export const signInPageSelectors = {
  signInLink: 'a[href*="/login"]',
  signInForm: "form",
  userName: "#login_field",
  password: "#password",
  signInButton: 'input[value="Sign in"]',
  signOutButton: 'button[data-ga-click*="sign out"]',
  globalNavMenu: 'nav[aria-label*="Global"]',
};
