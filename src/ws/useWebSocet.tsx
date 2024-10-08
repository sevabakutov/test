import { useEffect, useRef, useState, useCallback } from "react";
import { TradeInvestment, TradePool, UserData } from "../typings";
import { sendMessage } from "./events";



export const useWebSocket = (url: string) => {
  const ws = useRef<WebSocket>();

  const [newTradePool, setNewTradePool] = useState<TradePool>(null);
  const [allTradePools, setAllTradePools] = useState<TradePool[]>([]);
  const [userData, setUserData] = useState<UserData>(null);
  const [needCreate, setNeedCreate] = useState<boolean>(false);
  const [verifError, setVerifError] = useState<boolean>();
  const [error, setError] = useState<Event | null>(null);
  const [readyState, setReadyState] = useState<WebSocket["readyState"]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  

  const send = useCallback((data: string) => {
    if (ws.current) {
      ws.current.send(data);
    }
  }, []);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = (event) => {
      console.log(`Connected: ${url}`);
      setReadyState(ws.current?.readyState);
      // sendMessage("user", "auth", send, )
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type == "verif") {
        setVerifError(true);

      } else if (data.type == "user") {
        if (data.status == 403 && data.message == "TelegramUser matching query does not exist.") {
          setNeedCreate(true);

        } else if (data.status == 403) {
          console.log(data);

        } else if (data.status == 200) {
          const isNewUser = data.message == "User was cerated!";
          setNeedCreate(false);
          setUserData({
            id: data.user.id,
            img: data.user.img,
            pnl: data.user.pnl,
            telegramWallet: data.user.telegram_wallet,
            username: data.user.username,
            tradePools: isNewUser ? null : data.trade_pools,
            tradeInvestments: isNewUser ? null : data.trade_invs
          });
      
          if (data.message == "User was updated!") {
            setUserData(prevUserData => ({
              ...prevUserData,
              pnl: data.pnl,
              telegramWallet: data.telegram_wallet
            }));
          }

          setIsLoading(false)
        } else {
          console.log(data)
        }

      } else if (data.type == "trade_pool") {
          if (data.status == 200) {
            if (data.message == 'All trade pools') {
              console.log(data);
              setAllTradePools(data.pools)

            } else {
              setNewTradePool({
                id: data.user_data.id,
                username: data.username,
                activeId: data.user_data.active_id,
                isLong: data.user_data.isLong,
                isOrder: data.user_data.isOrder,
                order: data.user_data.order,
                finalAmount: data.user_data.final_amount,
                stopLoss: data.user_data.stop_loss,
                takeProfit: data.user_data.take_profit,
                leverage: data.user_data.leverage,
                currValue: 0,
                inAmount: 0,
                createdAt: data.user_data.created_at,
                type: 'trade_pool'
              });

              if (data.message == 'Trade pool created') {
      
                setUserData(prevUserData => ({
                  ...prevUserData,
                  username: data.username,
                  tradePools: [...prevUserData.tradePools, newTradePool]
                }));
  
              } else if (data.message == 'Pool updated') {
            
                setUserData(prevUserData => {
                  const updatedPools = prevUserData.tradePools.map(pool =>
                    pool.id === data.id ? { ...pool, ...newTradePool } : pool
                  );
            
                  return {
                    ...prevUserData,
                    tradePools: updatedPools
                  };
                });
  
              } else {
                console.log(data.message, data);
              }
            }
          } else {
            console.log(data);
          }

        } else if (data.type == 'trade_inv') {
          if (data.status == 200) {
            const newTradeInv: TradeInvestment = {
              id: data.id,
              userId: data.user,
              tradePoolId: data.trade_idea,
              amount: data.amount_invested
            }

            if (data.message == 'Trade investment created') {
              console.log(data);

              setUserData(prevUserData => ({
                ...prevUserData,
                tradeInvestments: [...prevUserData.tradeInvestments, newTradeInv]
              }));

            } else if (data.message == 'Trade investment updated') {
              console.log(data);

              setUserData(prevUserData => {
                const updatedInvestments = prevUserData.tradeInvestments.map(inv =>
                  inv.id === data.id ? { ...inv, ...newTradeInv } : inv
                );
          
                return {
                  ...prevUserData,
                  tradeInvestments: updatedInvestments
                };
              });

            } else {
              console.log(data);
            }

          } else {
            console.log(data);
          }

        } else {
          console.log(data);
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

  return { send, userData, verifError, needCreate, error, readyState, newTradePool, isLoading, setNewTradePool, allTradePools };
};
