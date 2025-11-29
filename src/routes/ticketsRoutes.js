import { Router } from "express";
import { 
  createTicket,
  getTickets, 
  getTicketById, 
  deleteTicket 
} from "../controllers/ticketsController.js";

const router = Router();

router.post("/", createTicket);
router.get("/", getTickets);
router.get("/:id", getTicketById);
router.delete("/:id", deleteTicket);

export default router;
