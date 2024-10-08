export interface TradePool {
  username: string;
  activeId: number | null;
  isLong: boolean | null;
  isOrder: boolean;
  order: number | null;
  finalAmount: number | null;
  stopLoss: number;
  takeProfit: number;
  leverage: number;
  currValue: number;
  inAmount: number;

  id?: number;
  createdAt?: Date;
  type?: string;
}

export interface TradeInvestment {
  id: number;
  userId: number;
  tradePoolId: number;
  amount: number;
}

export interface UserData {
  id: number;
  img: string | null;
  pnl: number;
  telegramWallet: string | null;
  username: string;

  tradePools: TradePool[] | null;
  tradeInvestments: TradeInvestment[] | null;  
}
