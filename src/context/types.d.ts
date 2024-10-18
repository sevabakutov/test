import { TradeInvestment } from "../typings";

interface InvestemntProviderProps {
    children: React.ReactNode;
}

interface InvestmentContextType {
    tradeInvestments: TradeInvestment[];
    setTradeInvestments: (newTradeInvestments: TradeInvestment[]) => void;
    createTradeInvestment: (newTradeInvestment: TradeInvestment) => void;
    deleteTradeInvestment: (investmentId: number | string) => void;
}

export type InvestmentArray = (TradeInvestment)[];