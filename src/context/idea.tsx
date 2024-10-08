import React, { createContext, useContext, useEffect, useState } from "react";
import { TradePool } from "../typings";
import { useWebSocket } from "../ws/useWebSocet";
import { WebSocketContext } from "./socet";

interface IdeaProviderProps {
  children: React.ReactNode;
}


export type IdeaArray = (TradePool)[];

interface IdeaContextType {
  tradePools: TradePool[];
  createTradePool: (newTradePool: TradePool) => void;

  ideaStatusFilter: string;
  setIdeaStatusFilter: (status: string) => void;

  ideaTypeFilter: string;
  setIdeaTypeFilter: (type: string) => void;
}

export const IdeaContext = createContext<IdeaContextType | undefined>(
  undefined
);

export const IdeaProvider: React.FC<IdeaProviderProps> = ({ children }) => {
  const [tradePools, setTradePools] = useState<TradePool[]>([]);
  const { allTradePools } = useContext(WebSocketContext);
  const [ideaStatusFilter, setIdeaStatusFilter] = useState<string>("new");

  const [ideaTypeFilter, setIdeaTypeFilter] = useState<string>("all");

  const createTradePool = (newTradePool: TradePool): void => {
    setTradePools([...tradePools, newTradePool]);
  };

  useEffect(() => {
    if (allTradePools) {
      setTradePools(allTradePools);
    }
  }, [allTradePools]);

  return (
    <IdeaContext.Provider
      value={{
        tradePools,
        createTradePool,

        ideaStatusFilter,
        ideaTypeFilter,

        setIdeaStatusFilter,
        setIdeaTypeFilter,
      }}
    >
      {children}
    </IdeaContext.Provider>
  );
};
