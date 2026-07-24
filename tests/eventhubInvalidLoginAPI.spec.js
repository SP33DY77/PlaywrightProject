const { test, expect, request } = require("@playwright/test");
const LoginPageAPI = require("../EventHubPO/EventHubAPI/LoginPageAPI");
const LoginPage = require("../EventHubPO/LoginPage");
const loginPayloadFake = require("../EventHubPO/LoginPayloadFake.json");
const baseURLAPI = "https://api.eventhub.rahulshettyacademy.com/api/";
const AuthHelper = require("../EventHubPO/EventHubAPI/AuthHelper");
let loginToken;
let apiContext;


test.beforeAll(async () => {
    apiContext = await request.newContext();
    const loginPageAPI = new LoginPageAPI(apiContext, loginPayloadFake, baseURLAPI + "auth/login");
    loginToken = await loginPageAPI.getTokenWithInvalidCredentials();
    expect(loginToken).toBeNull();

});

test.afterAll(async () => {
    await apiContext.dispose();
});

test("User should not be able to access dashboard with invalid credentials", async ({ page }) => {
    const authHelper = new AuthHelper(page, loginToken);
    const loginPage = new LoginPage(page);
    await loginPage.goToBaseURL();
    await expect(page).toHaveURL("/");
    await page.waitForLoadState("networkidle");
    await authHelper.loginToPage();
    await loginPage.takeScreenshot("api-invalid-login");
});

