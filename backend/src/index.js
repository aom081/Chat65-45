import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
import router from "./routers/auth.router.js";

const POST = process.env.POST;

const app = express();

app.use(express.json());
app.use();
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
