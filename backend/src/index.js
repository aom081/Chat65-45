import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js"; // Ensure the correct path and extension
dotenv.config();
import router from "./routers/auth.router.js";

const PORT = process.env.PORT;

const app = express();

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
  res.send("Hello World");
});

app.use("/api/auth", router);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
