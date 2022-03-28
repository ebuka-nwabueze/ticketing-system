import express from "express";
import {
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getTickets).post(protect, createTicket);

router
  .route("/:id")
  .get(protect, getTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket);

export default router;
