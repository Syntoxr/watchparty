import { Socket } from "socket.io";

export function joinRoom(socket: Socket, roomName: string) {
  socket.join(roomName);
  socket.data.room = roomName;
}
