import React, { createContext, useEffect } from "react";
import { useWebSocket } from "../ws/useWebSocet";
import { sendMessage } from "../ws/events";
import { useTelegram } from "../components/hooks/useTelegram";
import { TradePool, UserData} from "../typings";

interface WebSocketProviderProps {
  children: React.ReactNode;
}

interface WebSocketContextType {
  userData: UserData;
  verifError: boolean;
  send: (message: string) => void;
  readyState: WebSocket["readyState"] | undefined;
  error: Event | null;
  isLoading: boolean;
  needCreate: boolean;
  newTradePool: TradePool;
  setNewTradePool: (pool: TradePool | null) => void;
  allTradePools: TradePool[];
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
    needCreate,
    verifError,
    error,
    readyState,
    newTradePool,
    setNewTradePool,
    isLoading,
    allTradePools
  } = useWebSocket(url);


  const { tg } = useTelegram();
  const initData = tg.initData;
  console.log(initData)

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
      value={{ send, userData, verifError, error, readyState, isLoading, needCreate, newTradePool, setNewTradePool, allTradePools }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
