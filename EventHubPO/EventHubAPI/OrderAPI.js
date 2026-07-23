class OrderAPI {
    constructor(apiContext, orderPayload, loginToken) {
        this.apiContext = apiContext;
        this.orderPayload = orderPayload;
        this.loginToken = loginToken;
        this.orderApiUrl = "https://api.eventhub.rahulshettyacademy.com/api/bookings";
        this.deleteBookingsUrl = "https://api.eventhub.rahulshettyacademy.com/api/bookings";
    }

    async makeAnOrder() {
        const orderResp = await this.apiContext.post(this.orderApiUrl, {
            headers: {
                Authorization: `Bearer ${this.loginToken}`
            },
            data: this.orderPayload
        });
        const orderRespJson = await orderResp.json();
        if(orderRespJson.success === true){
            return orderRespJson.bookingRef;
        } else {
            throw new Error(`Failed to get booking: ${JSON.stringify(orderRespJson)}`);
        }
    }

    async clearAllOrders() {
        const deleteResp = await this.apiContext.delete(this.deleteBookingsUrl, {
            headers: {
                Authorization: `Bearer ${this.loginToken}`
            }
        });
        const deleteRespJson = await deleteResp.json();
        if(deleteRespJson.success === true){
            return deleteRespJson.bookingRef;
        } else {
            throw new Error(`Failed to get booking: ${JSON.stringify(deleteRespJson)}`);
        }
    }


}
module.exports = OrderAPI;