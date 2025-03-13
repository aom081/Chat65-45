import express from "express";
const router = express.Router();
import { getUsersForSidebar } from "../controllers/message.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

router.get("/users", protectedRoute, getUsersForSidebar);

export default router;
