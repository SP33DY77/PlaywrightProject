const { test, expect, request } = require("@playwright/test");
const LoginPageAPI = require("../EventHubPO/EventHubAPI/LoginPageAPI");
const baseURLAPI = "https://api.eventhub.rahulshettyacademy.com/api/";
const loginPayload = require("../EventHubPO/LoginPayload.json");
const orderAPI = require("../EventHubPO/OrderData.json");
const AuthHelper = require("../EventHubPO/EventHubAPI/AuthHelper");
let loginToken;


test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginPageAPI = new LoginPageAPI(apiContext, loginPayload, baseURLAPI + "auth/login")
    loginToken = await loginPageAPI.getToken();
    
});

test("Verify events on dashboard", async ({ page }) => {
    const authHelper = new AuthHelper(page, loginToken);
    console.log(orderAPI.customerEmail);
    console.log(orderAPI.customerPhone);
});