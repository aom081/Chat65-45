import { Server } from "socket.io";
import http from "http";
import express from "express";
import { log } from "console";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const server = http.createServer(app);
console.log(process.env.FRONTEND_URL);

const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL],
  },
});
const userSocketMap = {}; //{userId:socketId}
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A User connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log("UserSocketMap", userSocketMap);
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("friendRequestSent", (friendId) => {
    const receiverSocketId = getReceiverSocketId(friendId);
    console.log("receiverSocketId", receiverSocketId);

    if (receiverSocketId) {
      console.log("Before");

      io.to(receiverSocketId).emit("friendRequestReceived", userId);
      console.log("After");
    }
  });

  socket.on("friendRequestAccepted", (friendId) => {
    const receiverSocketId = getReceiverSocketId(friendId);
    console.log("receiverSocketId", receiverSocketId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("friendRequestAccepted", userId);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    console.log("UserSocketMap", userSocketMap);
  });
});

export { io, app, server };
