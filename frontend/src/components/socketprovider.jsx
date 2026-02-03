// import React, { createContext, useMemo, useContext, useState } from "react";
// import { io } from "socket.io-client";

// const SocketContext = createContext(null);

// export const useSocket = () => {
//   const socket = useContext(SocketContext);
//   return socket;
// };

// export const SocketProvider = (props) => {
//   // Build a socket URL safely; fall back to current origin
//   const envUrl = process.env.REACT_APP_SOCKET_URL || process.env.REACT_APP_IP;
//   const socketUrl =
//     envUrl && typeof envUrl === "string" ? envUrl : window.location.origin;
//   const socket = useMemo(() => io(socketUrl), [socketUrl]);
//   const [callEnded, setCallEnded] = useState(false);
//   const leaveCall = () => {};
//   return (
//     <SocketContext.Provider value={{ socket, callEnded, leaveCall }}>
//       {props.children}
//     </SocketContext.Provider>
//   );
// };


import React, { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

// 🔥 MUST point to backend
const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

export const SocketProvider = ({ children }) => {
  const value = useMemo(() => socket, []);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("useSocket must be used within SocketProvider");
  }
  return socket;
};
