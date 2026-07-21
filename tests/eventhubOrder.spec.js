const { test, expect, request } = require("@playwright/test");
const LoginPageAPI = require("../EventHubPO/EventHubAPI/LoginPageAPI");
const LoginPage = require("../EventHubPO/LoginPage");
const baseURLAPI = "https://api.eventhub.rahulshettyacademy.com/api/";
const loginPayload = { email: "test123@email.com", password: "Test123!" };
const AuthHelper = require("../EventHubPO/EventHubAPI/AuthHelper");
let loginToken;


test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginPageAPI = new LoginPageAPI(apiContext, loginPayload, baseURLAPI + "auth/login")
    loginToken = await loginPageAPI.getToken();
    
});


test("Verify events on dashboard", async ({ page }) => {
    const authHelper = new AuthHelper(page, loginToken);
    await authHelper.loginToPage();
    const loginPage = new LoginPage(page);
    await loginPage.goToBaseURL();
    await expect(page).toHaveURL("/")
});