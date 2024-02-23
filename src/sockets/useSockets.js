import { useEffect } from "react";
import socketIOClient from "socket.io-client";
import { socketEvents } from "./constants";
import { BACKEND_URL } from "../config/config";
import useCombinedStore from "../zustore/combinedStore";
export const socket = socketIOClient(BACKEND_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

function useSockets(isLoggedIn) {
  const userId = useCombinedStore((state) => state.auth.userId);

  useEffect(() => {
    if (isLoggedIn) {
      socket.connect();

      socket.onAny((event, ...data) => {
        console.log(
          "::::::::::::::::::SOCKET::::::::::::::",
          event,
          data,
          "INCOMING"
        );
      });

      socket.onAnyOutgoing((event, ...data) => {
        console.log(
          "::::::::::::::::::SOCKET::::::::::::::",
          event,
          data,
          "OUTGOING"
        );
      });

      socket.on("connect", () => {
        socket.emit(socketEvents.USER_JOIN_ROOM, { user_id: userId });
        console.log(socket, "socket connect");
      });

      return () => {
        console.log("disconnect");
        socket.removeAllListeners();
        socket.offAnyOutgoing();
        socket.offAny();
        socket.disconnect();
      };
    }
  }, [isLoggedIn, userId]);

  return socket;
}

export default useSockets;
