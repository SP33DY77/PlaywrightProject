const { test, expect, request } = require("@playwright/test");
const LoginPageAPI = require("../EventHubPO/EventHubAPI/LoginPageAPI");
const LoginPage = require("../EventHubPO/LoginPage");
const OrderAPI = require("../EventHubPO/EventHubAPI/OrderAPI");
const baseURLAPI = "https://api.eventhub.rahulshettyacademy.com/api/";
const loginPayload = require("../EventHubPO/LoginPayload.json");
const orderPayload = require("../EventHubPO/OrderData.json");
const AuthHelper = require("../EventHubPO/EventHubAPI/AuthHelper");
let loginToken;
let bookingRef;
let apiContext;
let orderAPI;


test.beforeAll(async () => {
    apiContext = await request.newContext();
    const loginPageAPI = new LoginPageAPI(apiContext, loginPayload, baseURLAPI + "auth/login");
    loginToken = await loginPageAPI.getToken();
});

test.afterAll(async () => {
    if (orderAPI) {
        await orderAPI.clearAllOrders();
    }
    if (apiContext) {
        await apiContext.dispose();
    }
});

test("Verify events on dashboard", async ({ page }) => {
    const authHelper = new AuthHelper(page, loginToken);
     const loginPage = new LoginPage(page);
    orderAPI = new OrderAPI(apiContext, orderPayload, loginToken);
    bookingRef = await orderAPI.makeAnOrder();
    await loginPage.goToBaseURL();
    await expect(page).toHaveURL("/");
    await page.getByTestId('nav-bookings');
    let eventCounts = page.getByTestId('booking-card').count();
    for(let i = 0; i < eventCounts; i++){
        let bookingId = page.getByTestId('booking-card').nth(i).locator(".booking-ref").textContent();
        if(bookingId){
            expect(bookingId).toContain(bookingRef);
        } else {
            throw new Error(`Booking ID not found for booking card at index ${i}`);
        }
    };

});