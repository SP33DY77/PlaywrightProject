const { test, expect, request } = require("@playwright/test");
const LoginPage = require("../EventHubPO/LoginPage");
const loginPayload = { email: "test123@email.com", password: "Test123!" };
const wrongLoginPayload = { email: "test123222222@test.pl", password: "Test3333!" };
const emptyLoginPayload = { email: "", password: "" };



test("Validate login page UI elements", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goToBaseURL();

    await expect(loginPage.apiDocLink).toBeVisible();
    await expect(loginPage.apiDocLink).toHaveText("API Documentation (Swagger)");
    await expect(loginPage.apiDocLink).toHaveAttribute("href",
        "https://api.eventhub.rahulshettyacademy.com/api/docs"
    );

    await expect(loginPage.emailArea).toBeVisible();
    await expect(loginPage.emailArea).toBeEnabled();
    await expect(loginPage.emailArea).toHaveAttribute("type", "email");
    await expect(loginPage.emailArea).toHaveAttribute("placeholder", "you@email.com");

    await expect(loginPage.pswdArea).toBeVisible();
    await expect(loginPage.pswdArea).toBeEnabled();
    await expect(loginPage.pswdArea).toHaveAttribute("type", "password");
    await expect(loginPage.pswdArea).toHaveAttribute("placeholder", "••••••");

    await expect(loginPage.signInBtn).toBeVisible();
    await expect(loginPage.signInBtn).toBeEnabled();
    await expect(loginPage.signInBtn).toHaveText("Sign In");

    await expect(loginPage.registerBtn).toBeVisible();
    await expect(loginPage.registerBtn).toHaveText("Register");
    await expect(loginPage.registerBtn).toHaveAttribute("href", /register/);



    await expect(loginPage.environmentInfoBtn).toBeVisible();
    await expect(loginPage.environmentInfoBtn).toHaveText("RahulShettyAcademy.com");
    await expect(loginPage.environmentInfoBtn).toHaveAttribute("href", "https://rahulshettyacademy.com");

})

test("Login Validation with incorrect data", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goToBaseURL();
    await loginPage.loginToAccount(wrongLoginPayload);

    await expect(loginPage.invalidDataMsg).toBeVisible();
    await expect(loginPage.invalidDataMsg).toHaveText("Invalid email or password");
    await loginPage.takeScreenshot("invalid-password")

});

test("Login Validation with empty data", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goToBaseURL();
    await loginPage.loginToAccount(emptyLoginPayload);

    await expect(loginPage.emailMsg).toBeVisible();
    await expect(loginPage.emailMsg).toHaveText("Enter a valid email");

    await expect(loginPage.pswdMsg).toBeVisible();
    await expect(loginPage.pswdMsg).toHaveText("Password must be at least 6 characters");

    await loginPage.takeScreenshot("empty-data");
});

test("Login Validation with correct data", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goToBaseURL();
    await loginPage.loginToAccount(loginPayload);
    await expect(page).toHaveURL("/");
    await expect(loginPage.mainDashboardBanner).toHaveText("Discover & BookAmazing Events");
    await loginPage.takeScreenshot("valid-login");
});




