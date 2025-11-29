import express from "express";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
import {
  createEvents,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from "../controllers/eventsController.js";

const router = express.Router();

// allow both 'organizer' and 'admin' to manage events
router.post("/", auth, role(["organizer"]), createEvents);
router.get("/", auth, getEvents);
router.get("/:id", auth, getEventById);
router.put("/:id", auth, role(["organizer"]), updateEvent);
router.delete("/:id", auth, role(["organizer"]), deleteEvent);

export default router;