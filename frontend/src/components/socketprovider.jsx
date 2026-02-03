import React, { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

// 🔥 MUST point to backend
// const socket = io("http://localhost:4000", {
//   transports: ["websocket"],
// });
const socket = io("https://video-calling-platform-main.onrender.com", {
  transports: ["websocket"],
});

export const SocketProvider = ({ children }) => {
  const value = useMemo(() => socket, []);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("useSocket must be used within SocketProvider");
  }
  return socket;
};
