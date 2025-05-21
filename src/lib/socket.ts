import { io, Socket } from "socket.io-client";

const socket: Socket = io("https://backend.enjazkw.com/", {
  autoConnect: false, // We'll connect manually after login
});

export default socket;
