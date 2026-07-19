class AuthHelper {
    
    constructor(page, loginToken) {
        this.page = page;
        this.loginToken = loginToken;
    }

    async loginToPage() {
        await this.page.addInitScript(token => {
            window.localStorage.setItem("eventhub_token", token);
        }, this.loginToken);
    }
}
module.exports = AuthHelper;