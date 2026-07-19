const { test, expect, request } = require("@playwright/test");
const LoginPageAPI = require("../EventHubPO/EventHubAPI/LoginPageAPI");
const LoginPage = require("../EventHubPO/LoginPage");
const loginPayload = { email: "test123@email.com", password: "Test123!" };
const baseURLAPI = "https://api.eventhub.rahulshettyacademy.com/api/";
const AuthHelper = require("../EventHubPO/EventHubAPI/AuthHelper");
let loginToken;
let apiContext;


test.beforeAll(async () => {
    apiContext = await request.newContext();
    const loginPageAPI = new LoginPageAPI(apiContext, loginPayload, baseURLAPI + "auth/login");
    loginToken = await loginPageAPI.getToken();
    expect(loginToken).toBeTruthy();

});

test.afterAll(async () => {
    await apiContext.dispose();
});

test("User should access dashboard after API authentication", async ({ page }) => {
    const authHelper = new AuthHelper(page, loginToken);
    await authHelper.loginToPage();
    const loginPage = new LoginPage(page);
    await loginPage.goToBaseURL();
    await expect(page).toHaveURL("/");
    await expect(loginPage.mainDashboardBanner).toHaveText("Amazing Events");
    await loginPage.takeScreenshot("api-login");
});

