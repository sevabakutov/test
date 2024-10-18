import { useEffect, useRef, useState, useCallback, useContext } from "react";
import { LeaderboardItem, TradeInvestment, TradePool, UserData } from "../typings";
import { IdeaContext } from "../context/idea";
import { InvestmentContext } from "../context/investment";


export const useWebSocket = (url: string) => {
  const ws = useRef<WebSocket>();

  const [userData, setUserData] = useState<UserData>(null);
  const [error, setError] = useState<Event | null>(null);
  const [readyState, setReadyState] = useState<WebSocket["readyState"]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);

  const { createTradePool, updateTradePool, setTradePools, tradePools } = useContext(IdeaContext)!;
  const { createTradeInvestment, setTradeInvestments } = useContext(InvestmentContext)!;


  const send = useCallback((data: string) => {
    if (ws.current) {
      ws.current.send(data);
    }
  }, []);

  useEffect(() => {
    console.log()
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log(`Connected: ${url}`);
      setReadyState(ws.current?.readyState);
    };

    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type == "auth") {

        console.log("Server response: type 'auth'", msg);


        const newUserData = {
          id: msg.data.user.user.id,
          img: msg.data.user.user.img,
          pnl: msg.data.user.user.pnl,
          telegramWallet: msg.data.user.user.telegram_wallet,
          username: msg.data.user.user.username,
          tradePools: msg.data.user.trade_pools,
          tradeInvestments: msg.data.user.trade_invs
        };

        setUserData(newUserData);
        setLeaderboard(msg.data.dash);
        setTradePools(msg.data.pools);
        setTradeInvestments(msg.data.invs);
        
        setIsLoading(false);

      } else if (msg.type == "pool") {
        
        console.log("New pool:", msg.data);
    
        const addTradePoolToUser = (newTradePool: TradePool): void => {
          setUserData((prevUserData) => {
            const updatedTradePools = prevUserData?.tradePools
              ? [...prevUserData.tradePools, newTradePool]
              : [newTradePool];
      
            return {
              ...prevUserData,
              tradePools: updatedTradePools
            };
          });
        };

        addTradePoolToUser(msg.data);
        createTradePool(msg.data);
      
      } else if (msg.type == "investment") {

        console.log("Server response type invs:", msg);

        const tradePool = msg.data.pool;
        const investment = msg.data.investment;

        if (investment) createTradeInvestment(investment);

        updateTradePool(tradePool);
        setUserData((prevUserData) => {
          const updatedTradePools = prevUserData.tradePools.map((pool) =>
            pool.id === tradePool.id ? { ...pool, ...tradePool } : pool
          );
          
          return {
            ...prevUserData,
            tradePools: updatedTradePools
          };
        });
      }
    }

    ws.current.onerror = (event) => {
      console.log("New error:", event);
      setError(event);
    };

    ws.current.onclose = (event) => {
      console.log("closed", event);
      setReadyState(ws.current?.readyState);
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  return { send, userData, error, readyState, isLoading, leaderboard};
};
