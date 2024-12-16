import TicketModel from "./models/ticket.model.js";

class TicketDao {
  async save(ticketData) {
    const ticket = new TicketModel(ticketData);
    ticket.save();
    return ticket;
  }
  async find(query) {
    return await TicketModel.find(query);
  }
}

export default new TicketDao();
