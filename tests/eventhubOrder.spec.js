const { test, expect, request } = require("@playwright/test");
const loginPayload = { email: "test123@email.com", password: "Test123!" };
const AuthHelper = require("../EventHubPO/EventHubAPI/AuthHelper");
let loginToken;


test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginPageAPI = new LoginPageAPI(apiContext, loginPayload, baseURLAPI + "auth/login")
    loginToken = await loginPageAPI.getToken();
    authHelper = new AuthHelper(page);
});


test("Verify events on dashboard", async ({ page }) => {
    await authHelper.loginToPage(page);

});