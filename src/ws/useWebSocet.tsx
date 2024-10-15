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

  const { createTradePool, setTradePools, tradePools } = useContext(IdeaContext)!;
  const { setTradeInvestments,  } = useContext(InvestmentContext);


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
        console.log("data", msg.data.user.user);

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
        
        console.log('user data:', userData);

        setLeaderboard(msg.data.dash);
        setTradePools(msg.data.pools);
        setTradeInvestments(msg.data.invs);
        
        setIsLoading(false);

      } else if (msg.type == "pool") {
        
        console.log("New pool:", msg.data);
        const poolId = msg.data.id;

        const selectTradePool = (tradePools: TradePool[]) => {
          const result = tradePools.find((item: TradePool) => item.id === poolId);
          return result;
        };

        const tradePool = selectTradePool(tradePools);

        if (!tradePool) {
          const addTradePoolToUser = (newTradePool: TradePool): void => {
            if (userData) {
              setUserData((prevUserData) => {
                const updatedTradePools = prevUserData?.tradePools
                  ? [...prevUserData.tradePools, newTradePool]
                  : [newTradePool];
          
                return {
                  ...prevUserData,
                  tradePools: updatedTradePools
                };
              });
            }
          };
  
          addTradePoolToUser(msg.data);
          createTradePool(msg.data);

        } else {
          setUserData((prevUserData) => {
            const updatedTradePools = prevUserData.tradePools.map(  (pool) =>
              pool.id === poolId ? { ...pool, ...tradePool } : pool
            );
            
            return {
              ...prevUserData,
              tradePools: updatedTradePools
            };
          });
        }
      
      } else if (msg.type == "invs") {

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
