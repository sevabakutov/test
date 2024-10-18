import React, { createContext, useState } from "react";
import { InvestemntProviderProps, InvestmentContextType } from "./types";
import { TradeInvestment } from "../typings";

export const InvestmentContext = 
    createContext<InvestmentContextType | undefined>(undefined);

export const InvestmentProvider: React.FC<InvestemntProviderProps> = ({ children }) => {
    const [tradeInvestments, setTradeInvestments] = useState<TradeInvestment[]>([]);

    const createTradeInvestment = (newTradeInvestment: TradeInvestment): void => {
        setTradeInvestments((prevState) => [...prevState, newTradeInvestment]);
    }

    const deleteTradeInvestment = (investmentId: number|string): void => {
        setTradeInvestments((prevState) => 
            prevState.filter((investment) => investment.id !== investmentId)
        );
    };

    return (
        <InvestmentContext.Provider
            value={{
                tradeInvestments,
                setTradeInvestments,
                createTradeInvestment,
                deleteTradeInvestment
            }}
        >
            {children}
        </InvestmentContext.Provider>
    )
};