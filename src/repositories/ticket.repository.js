import ticketDao from "../dao/ticket.dao.js";

class TicketRepository {
  async createTicket(ticketData) {
    return await ticketDao.save(ticketData);
  }
  async getTickets(query) {
    return await ticketDao.find(query);
  }
}

export default new TicketRepository();
