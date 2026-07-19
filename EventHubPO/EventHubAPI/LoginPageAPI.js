class LoginPageAPI {
    constructor(apiContext, loginPayload, baseURL) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
        this.baseURL = baseURL;
    }

    async getToken() {
        const loginResp = await this.apiContext.post(this.baseURL, {
            data: this.loginPayload
        });
        const loginRespJson = await loginResp.json();
        if (loginRespJson.success === true && loginRespJson.token) {
            return loginRespJson.token;
        } else {
            throw new Error(`Failed to get token: ${JSON.stringify(loginRespJson)}`);
        }
        console.log("TOKEN SET", token);
    }
}
module.exports = LoginPageAPI;