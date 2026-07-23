class DashboardPage{
    constructor(page){
        this.page = page;
        this.singleEvent = this.singleEvent = page.locator("#event-card");
        this.myBookings = page.getByRole('button', { name: 'My Bookings' });
    }

    async countEvents(){
        let eventCount = await this.singleEvent.count();
        return eventCount;
    }
}
module.exports = DashboardPage;