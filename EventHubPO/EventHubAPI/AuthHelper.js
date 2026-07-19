class AuthHelper {

    constructor(page) {
        this.page = page
    }

    async loginToPage(page) {
        await page.addInitScript(value => {
            window.localStorage.setItem("eventhub_token", value);
        }, loginToken)
    }

}
module.exports = AuthHelper;