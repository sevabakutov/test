import React, { createContext, useState } from "react";
import { TradePool } from "../typings";

interface IdeaProviderProps {
  children: React.ReactNode;
}

export type IdeaArray = (TradePool)[];

interface IdeaContextType {
  tradePools: TradePool[];
  setTradePools: (newTradePools: TradePool[]) => void;
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
  const [ideaStatusFilter, setIdeaStatusFilter] = useState<string>("new");

  const [ideaTypeFilter, setIdeaTypeFilter] = useState<string>("all");

  const createTradePool = (newTradePool: TradePool): void => {
    setTradePools((prevState) => [...prevState, newTradePool]);
  };


  return (
    <IdeaContext.Provider
      value={{
        tradePools,
        setTradePools,
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
