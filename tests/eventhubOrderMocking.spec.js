const { test, expect, request } = require("@playwright/test");
const LoginPageAPI = require("../EventHubPO/EventHubAPI/LoginPageAPI");
const LoginPage = require("../EventHubPO/LoginPage");
const baseURLAPI = "https://api.eventhub.rahulshettyacademy.com/api/";
const loginPayload = require("../EventHubPO/LoginPayload.json");
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

test("Should display zero orders when bookings API returns an empty list", async ({ page }) => {
    await page.route("**/api/bookings**", async route => {
        if (route.request().method() === "GET") {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    success: true,
                    bookings: []
                })
            });
        } else {
            await route.continue();
        }
    });

    const authHelper = new AuthHelper(page, loginToken);
    await authHelper.loginToPage();

    const loginPage = new LoginPage(page);
    await loginPage.goToBaseURL();

    await page.goto("/bookings", {
        waitUntil: "domcontentloaded"
    });
    await expect(page).toHaveURL("/bookings");
    await expect(page.getByRole('heading', { name: 'No bookings yet' })).toBeVisible();
    await expect(page.getByTestId("booking-card")).toHaveCount(0);
});
