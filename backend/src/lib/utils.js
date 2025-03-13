import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET;
const node_mode = process.env.NODE_ENV;

export const generateToken = (userId, res) => {
  const Token = Jwt.sign({ userId }, secret, { expiresIn: "1d" });

  res.cookie("jwt", Token, {
    httpOnly: true,
    secure: node_mode !== "development",
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: "strict",
  });

  console.log("Token generated and cookie set");

  return Token;
};
