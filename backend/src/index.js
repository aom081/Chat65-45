import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";
dotenv.config();
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import friendRouter from "./routes/friend.route.js";

const PORT = process.env.PORT;

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Restful Service for MERN Chat Project</h1>");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/friend", friendRouter);

server.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});
