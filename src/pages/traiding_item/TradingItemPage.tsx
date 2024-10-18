import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useTelegram } from "../../components/hooks/useTelegram";

import { IdeaContext } from "../../context/idea";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "./styles.scss";
import { TradePool } from "../../typings";
import InPopup from "./InPopup";
import { InvestmentContext } from "../../context/investment";
import { UserContext } from "../../context/profile";
import { sendMessage } from "../../ws/events";
import { WebSocketContext } from "../../context/socet";

const TradingItemPage = () => {
  const { id } = useParams();

  const { user } = useContext(UserContext);
  const { send } = useContext(WebSocketContext);
  const { tradePools } = useContext(IdeaContext);
  const { tradeInvestments } = useContext(InvestmentContext);

  const { tg } = useTelegram();
  const navigate = useNavigate();

  const [inModal, setInModal] = useState<Boolean>(false);

  useEffect(() => {
    const handleBackButtonClick = () => navigate("/");

    tg.BackButton.hide();
    tg.BackButton.show();
    tg.BackButton.onClick(handleBackButtonClick);

    return () => {
      tg.BackButton.offClick(handleBackButtonClick);
    };
  }, [tg, navigate]);

  const selectTradePool = (tradePools: TradePool[]) => {
    const result = tradePools.find((item: TradePool) => item.id === +id);
    return result;
  };

  const tradePool = selectTradePool(tradePools);
  const { username, activeId, isLong, finalAmount, stopLoss, leverage, takeProfit, currValue } = tradePool;

  const tradePoolInvestments = tradeInvestments.filter(
    (investment) => investment.tradeIdea == tradePool.id
  );

  const openInModal = () => {
    setInModal(true);
  }

  const closeInModal = () => {
    setInModal(false);
  }

  const handleOutOnlick = () => {
    for (let i = 0; i < tradeInvestments.length; ++i) {
      if (tradeInvestments[i].userId == user.id && tradeInvestments[i].tradeIdea == tradePool.id) {
        tradePool.currValue -= tradeInvestments[i].amountInvested;
      }
    }

    sendMessage("investment", "delete", send, {
      "pool": tradePool,
      "investment": {
        "userId": user.id,
        "tradePoolId": tradePool.id
      }
    })

    // for(let i = 0 ; i < user.tradeInvestments.length; i++) {
    //   const updatedTradePool: TradePool = {
    //     ...tradePool,
    //     currValue: +tradePool.currValue - +user.tradeInvestments[i].amountInvested,
    //     inAmount: tradePool.inAmount - 1,
    //   };
    // }
    // при клике на out у нас удаляются все инвестции текущего пользователя с текущего пула. и обновляется currValue текущего пула 
    // у нас у пользователя может быть 1239 инвестиций на пул, но при кнопке out у нас удаляются все. не заню как с inAmount
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div className="header_block">
          <div className="header_container">
            <div className="createdBy">Created by</div>
            <div className="nick">{username}</div>
          </div>
        </div>
        <div className="main_block">
          <div className="main_container">
            <div className="main_btns">
              <button
                style={{ backgroundColor: "#067c06" }}
                className="main_btn buy"
                onClick={openInModal}>        
                In
              </button>
              {inModal && <InPopup tradePool={tradePool} closeModal={closeInModal} />}
              <button
                style={{ backgroundColor: "#8a0303" }}
                className="main_btn sell"
                onClick={handleOutOnlick}
              >
                Out
              </button>
              <button
                style={{ backgroundColor: "#4444f4" }}
                className="main_btn share"
              >
                Share
              </button>
            </div>
            <div className="main_info">
              <div className="main_info_item">Acive: {activeId}</div>
              <div className="main_info_item">Long/Short: {isLong}</div>
              <div className="main_info_item">Pool amount: {finalAmount}</div>
              <div className="main_info_item">Stop loss: {stopLoss}</div>
              <div className="main_info_item">Leverage: {leverage}</div>
              <div className="main_info_item">Take profit: {takeProfit}</div>
              <div className="main_info_item">Current amount: {currValue}</div>
            </div>
            <div className="main_pull">
              <div className="main_pullText">Pool volume</div>
              <div className="main_pullCircle">
                <CircularProgressbar
                  value={(currValue / finalAmount) * 100}
                  maxValue={100}
                  text={`${((currValue / finalAmount) * 100).toFixed(1)}`}
                  styles={buildStyles({
                    pathTransitionDuration: 0.5,
                    textSize: "36px",
                    pathColor: `#5eff5a`,
                    textColor: "#5eff5a",
                    trailColor: "#1c1c1c",
                  })}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="list_block">
          {tradePoolInvestments.map((investment) => (
            <div className="list_item">
              <div className="list_item_name">{investment.username}</div>
              <div className="list_item_value">{((+investment.amountInvested / finalAmount) * 100 ).toFixed(1)}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradingItemPage;
