import { io } from "socket.io-client";
import { useEffect, useRef } from "react";

export default function useSocketInit() {
  const socket = useRef(null);
  useEffect(() => {
    socketInitializer();
  }, []);

  async function socketInitializer() {
    const res = await fetch("/api/socket");

    socket.current = io({
      withCredentials: true,
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    socket.current.on("connect", () => {
      console.log("socket connected");
    });

    socket.current.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  return socket;
}
