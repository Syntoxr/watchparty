import express, { Express, Request, Response } from "express";
import * as http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { generateUid } from "./lib/generateUid";
import { joinRoom } from "./lib/joinRoom";

dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

const app: Express = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "https://www.netflix.com"
  }
});

const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

//#region Socket.IO
io.use((socket, next) => {
  const header = socket.handshake.headers["authorization"];
  if (header == process.env.TOKEN) {
    return next();
  }
  return next(new Error("authentication error"));
});

io.on("connection", (socket) => {
  // standard message
  socket.on("message", (msg) => console.log(msg));

  //#region createRoom event
  socket.on("createRoom", (msg, callback) => {
    if (typeof callback !== "function") {
      console.log("callback is not a function");
      return;
    }
    const roomName = generateUid(io.sockets.adapter.rooms);
    if (socket.data.room) socket.leave(socket.data.room)
    console.log(`User ${socket.id} created room ${roomName}`);
    joinRoom(socket, roomName);
    callback({
      name: roomName,
    });
  });
  //#endregion createRoom event

  //#region joinRoom event
  socket.on("joinRoom", (msg, callback) => {
    if (typeof callback !== "function") {
      console.log(
        "callback is not a function, please request an acknowlogement"
      );
      return;
    }

    if (!io.sockets.adapter.rooms.has(msg.name)) {
      callback({
        status: "error",
        message: `Room '${msg.name}' does not exist`,
      });
      return;
    }

    if (socket.data.room) socket.leave(socket.data.room)
    joinRoom(socket, msg.name);
    callback({
      status: "success",
    });
  });
  //#endregion joinRoom event

  //#region action event
  socket.on("action", (msg) => {
    if (!socket.data.room) return; //has't joined a room yet
    socket.broadcast.to(socket.data.room).emit("action", msg);
  });

  console.log("A user connected");
  //#endregion action event
});

//#region room events
io.of("/").adapter.on("join-room", (roomName, id) => {
  if (roomName.length > 6) return;
  console.log(`User: ${id} joined ${roomName}`);
});

io.of("/").adapter.on("leave-room", (roomName, id) => {
  if (roomName.length > 6) return;
  console.log(`user: ${id} left ${roomName}`);
});

//#endregion room events

//#endregion Socket.IO

/**
 * start server
 */
httpServer.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
