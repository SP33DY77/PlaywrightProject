class LoginPage {
    constructor(page) {
        this.page = page;
        this.apiDocLink = page.getByRole('link', { name: 'API Documentation (Swagger)' });
        this.emailArea = page.getByRole('textbox', { name: 'Email' });
        this.pswdArea = page.getByRole('textbox', { name: 'Password' });
        this.signInBtn = page.getByRole('button', { name: 'Sign In' });
        this.registerBtn = page.getByRole('link', { name: 'Register' });
        this.invalidDataMsg = page.getByText('Invalid email or password', { exact: true });
        this.emailMsg = page.getByText('Enter a valid email', { exact: true })
        this.pswdMsg = page.getByText('Password must be at least 6 characters', { exact: true })
        this.environmentInfoBtn = page.getByRole('link', { name: 'RahulShettyAcademy.com' });
        this.mainDashboardBanner = page.locator('span.text-indigo-200');
    }

    async goToBaseURL() {
        await this.page.goto("/", {
            waitUntil: "domcontentloaded"
        });
    }


    async loginToAccount(loginPayload) {
        await this.emailArea.fill(loginPayload.email);
        await this.pswdArea.fill(loginPayload.password);
        await this.signInBtn.click();
        await this.page.waitForLoadState("networkidle");

    }

    async takeScreenshot(name) {
        await this.page.screenshot({
            path: `./screenshots/${name}.png`
        });
    }

}
module.exports = LoginPage;