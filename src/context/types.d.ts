import { TradeInvestment } from "../typings";

interface InvestemntProviderProps {
    children: React.ReactNode;
}

interface InvestmentContextType {
    tradeInvestments: TradeInvestment[];
    setTradeInvestments: (newTradeInvestments: TradeInvestment[]) => void;
    createTradeInvestment: (newTradeInvestment: TradeInvestment) => void;
}

export type InvestmentArray = (TradeInvestment)[];