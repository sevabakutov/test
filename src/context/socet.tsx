import React, { createContext, useEffect } from "react";
import { useWebSocket } from "../ws/useWebSocet";
import { sendMessage } from "../ws/events";
import { useTelegram } from "../components/hooks/useTelegram";
import { LeaderboardItem, TradePool, UserData} from "../typings";

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
  const url = "ws://127.0.0.1:8000/ws/telegram/main/";
  const {
    send,
    userData,
    error,
    readyState,
    isLoading,
    leaderboard
  } = useWebSocket(url);


  // const { tg } = useTelegram();
  const initData = "query_id=AAGpnF5NAgAAAKmcXk3ZYiDA&user=%7B%22id%22%3A5590313417%2C%22first_name%22%3A%22%D0%A1%D0%B5%D0%B2%D0%B0%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Prostovsolo18%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1728385736&hash=25b2d4f87aaed7d1895ac2387385638b7354c0f7467f8d02302feab5176cc69a" 
  
  useEffect(() => {
    const fetchData = () => {
      if (readyState === WebSocket.OPEN) {
        console.log('socket main useEffect');
        sendMessage('user', 'auth', send, { init_data: initData });
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
