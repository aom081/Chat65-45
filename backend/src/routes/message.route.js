import express from "express";
const router = express.Router();
import {
  getUsersForSidebar,
  sendMessage,
  getMessage,
} from "../controllers/message.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

router.get("/users", protectedRoute, getUsersForSidebar);
router.get("/:id", protectedRoute, getMessage);
router.post("/send/:id", protectedRoute, sendMessage);

export default router;
