const { test, expect, request } = require("@playwright/test");
const loginPayload = { email: "test123@email.com", password: "Test123!" };
const loginToPage = require("./evenhubValidLoginAPI.spec");
const AuthHelper = require("../EventHubPO/EventHubAPI/authHelper");
let loginToken;


test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginPageAPI = new LoginPageAPI(apiContext, loginPayload, baseURLAPI + "auth/login")
    loginToken = await loginPageAPI.getToken();
    authHelper = new AuthHelper(page);
});



test("Login Validation with correct data", async ({ page }) => {
    await authHelper.loginToPage(page);

});