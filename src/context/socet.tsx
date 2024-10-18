import React, { createContext, useEffect } from "react";
import { useWebSocket } from "../ws/useWebSocet";
import { sendMessage } from "../ws/events";
import { useTelegram } from "../components/hooks/useTelegram";
import { LeaderboardItem, UserData} from "../typings";

interface WebSocketProviderProps {
  children: React.ReactNode;
}

interface WebSocketContextType {
  userData: UserData;
  send: (message: string) => void;
  readyState: WebSocket["readyState"] | undefined;
  error: Event | null;
  isLoading: boolean;
  leaderboard: LeaderboardItem[];
}

export const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
  const url = "ws://hash-cash.io/ws/telegram/main/";
  const {
    send,
    userData,
    error,
    readyState,
    isLoading,
    leaderboard
  } = useWebSocket(url);


  const { tg } = useTelegram();
  
  useEffect(() => {
    const fetchData = () => {
      if (readyState === WebSocket.OPEN) {
        console.log('socket main useEffect');
        sendMessage('user', 'auth', send, { init_data: tg.initData });
      }
    };
  
    fetchData();
  }, [readyState]);

  return (
    <WebSocketContext.Provider
      value={{ send, userData, error, readyState, isLoading, leaderboard }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
