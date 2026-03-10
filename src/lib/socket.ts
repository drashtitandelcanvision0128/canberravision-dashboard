import { io, Socket } from "socket.io-client";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3001";

let socket: Socket | null = null;

export function getSocket(token?: string) {
  if (socket) return socket;

  socket = io(WS_URL, {
    transports: ["websocket"],
    auth: token ? { token } : undefined,
  });

  return socket;
}

export function closeSocket() {
  if (!socket) return;
  socket.disconnect();
  socket = null;
}
