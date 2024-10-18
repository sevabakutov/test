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
  id?: number;
  userId: number;
  tradeIdea: number;
  amountInvested: number;
  time: Date;

  username?: string;
}

export interface UserData {
  id: number;
  img: string | null;
  pnl: number;
  telegramWallet: string | null;
  username: string | null;

  tradePools: TradePool[] | null;
  tradeInvestments: TradeInvestment[] | null;  
}

export interface LeaderboardItem {
  username: string;
  pnl: int;
}