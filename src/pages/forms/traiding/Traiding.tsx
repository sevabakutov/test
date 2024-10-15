import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTelegram } from "../../../components/hooks/useTelegram";
import { useNavigate } from "react-router-dom";
import { useTonConnect } from "../../../components/hooks/useTonConnect";

import { WebSocketContext } from "../../../context/socet";
import { UserContext } from "../../../context/profile";

import MyInput from "../../../components/UI/input/MyInput";
import MySelect from "../../../components/UI/select/MySelect";
import MyRangeInput from "../../../components/UI/input/MyRangeInput";
import MyChooseInput from "../../../components/UI/input/MyChooseInput";

import "../form.scss";
import { sendMessage } from "../../../ws/events";
import { TradePool } from "../../../typings";
import { TonConnectButton } from "@tonconnect/ui-react";

const TradePoolComponent = () => {
  const navigate = useNavigate();

  const { send } = useContext(WebSocketContext);
  const { user } = useContext(UserContext);

  const { tg } = useTelegram();

  const [tradePool, setTradePool] = useState<TradePool>({
    username: user.username,
    activeId: null,
    isLong: null,
    isOrder: false,
    order: null,
    finalAmount: null,
    stopLoss: 0,
    takeProfit: 25,
    leverage: 2,
    currValue: 0,
    inAmount: 0,
  });

  const { wallet } = useTonConnect();

  const option = {
    activeOptions: [
      { value: 1, name: "TON" },
      { value: 2, name: "USDT" },
    ],

    dirOptions: [
      { value: "long", name: "Long" },
      { value: "short", name: "Short" },
    ],

    orderOption: [
      { value: "price", name: "Use current price" },
      { value: "order", name: "Set order" },
    ],
  };

  const onChange = useCallback(
    (value: number | string | boolean, tradePoolProperty: string) => {
      setTradePool((prevState) => ({
        ...prevState,
        [tradePoolProperty]: value,
      }));
    },
    []
  );

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Create",
    });
  }, [tg.MainButton]);

  useEffect(() => {
    if (
      tradePool.activeId == null ||
      tradePool.isLong == null ||
      (tradePool.finalAmount == null || tradePool.finalAmount <= 0) ||
      (tradePool.isOrder == true && tradePool.order == null)
    ) {
      // console.log("Button hide", "trade pool:", tradePool);
      tg.MainButton.hide();
    } else {
      // console.log("Button show", "trade pool:", tradePool);
      tg.MainButton.show();
    }
  }, [tradePool, wallet, tg.MainButton]);

  const handleOnClick = () => {
    const updatedTradePool = { ...tradePool , createdAt: new Date() };
    setTradePool(updatedTradePool);
    sendMessage("trade_pool", "create", send, updatedTradePool);
    navigate("/")
  };

  // useEffect(() => {

  //   const handleOnClick = () => {
  //     setTradePool({ ...tradePool, createdAt: new Date() });
  //     createTradePool(tradePool);
  //     sendMessage("trade_pool", "create", send, {
  //       ...tradePool
  //     });
  //   };
  //   tg.MainButton.onClick(handleOnClick);

  //   return () => {
  //     tg.MainButton.hide();
  //     tg.MainButton.offClick(handleOnClick);
  //   };

  // }, [tradePool, send, createTradePool, navigate, tg.MainButton]);

  return (
    <div className="form_wrapper">
      <form className="form">
        <div className="form_title">Fill out Trading form</div>
        <div className="form_block">
          <MySelect
            tag={"activeId"}
            defaultValue={"Select active"}
            onChange={onChange}
            options={option.activeOptions}
            withInput={false}
            type="text"
          />
{/* 
          <MySelect
            tag={"isLong"}
            defaultValue={"Select direction"}
            onChange={onChange}
            options={option.dirOptions}
            withInput={false}
            type="text"
          /> */}
          
          <MyChooseInput
            title={"Choose direction"}
            tag={"isLong"}
            variants={["Long", "Short"]}
            onChange={onChange}
            price={false}
          />

          <MyInput
            tag={"finalAmount"}
            value={tradePool.finalAmount}
            onChange={onChange}
            type="number"
            placeholder="Input pool"
            min={1}
          />

          <MyChooseInput
            title={"Choose order"}
            tag={"order"}
            min={1}
            max={10000000000}
            variants={["Use current price", "Set order"]}
            onChange={onChange}
            price={false}
          />

          <MyRangeInput onChange={onChange} />

          <MyChooseInput
            tag={"stopLoss"}
            title={"Stop Lose"}
            min={0}
            max={50}
            variants={[0, -15, -25, -50]}
            onChange={onChange}
            price={true}
          />

          <MyChooseInput
            tag={"takeProfit"}
            title={"Take profit"}
            min={0}
            max={300}
            variants={[25, 50, 100, 300]}
            onChange={onChange}
            price={true}
          />
        </div>
      </form>
      <button onClick={handleOnClick}>create</button>
      {!wallet ? <TonConnectButton /> : null}
    </div>
  );
};

export default TradePoolComponent;