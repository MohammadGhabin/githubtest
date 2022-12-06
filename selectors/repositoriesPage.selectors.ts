export const repositoriesPageSelectors = {
    searchRepositoryInput : '[placeholder="Find a repository…"]',
    repositoriesCounter : '[data-tab-item="repositories"] .Counter',
    overviewButton : '[data-tab-item="overview"]',
    newRepositoryLink : '.ml-3[href="/new"]',
    repositoryNameInput : 'input[name*="repository[name]"]',
    repositoryDescriptionInput : 'input[name*="repository[description]"]',
    createRepositoryButton : 'button[data-disable-with*="Creating"]',
    repositoryNavMenu : 'nav[aria-label*="Repository"]',
    codeLink : '#code-tab',
    settingLink : '#settings-tab',
    deleteRepositoryButton: '.flex-md-order-1 .boxed-action',
    verifyDeleteInput : 'input[aria-label*="delete"]',
    confirmDeleteButton : '.Box-body .btn-danger',
    deleteConfirmedAlert : '[role="alert"]'
}