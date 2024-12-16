import { Router } from "express";
import ticketController from "../controllers/ticket.controller.js";

const router = Router();

//crear ticket
router.post("/", ticketController.createTicket);

// Get ticket de usuario
router.get("/:userID", ticketController.getTicketsByUser);

export default router;
