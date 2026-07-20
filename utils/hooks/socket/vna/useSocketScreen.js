import { io } from "socket.io-client";
import { useEffect, useRef } from "react";

export default function useSocketInit({ handleNewProjectClick, handleNewKeywordInput }) {
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

    socket.current.on("new-vna-project-click", handleNewProjectClick);
    socket.current.on("new-vna-keyword-input", handleNewKeywordInput);
  }

  return socket;
}
