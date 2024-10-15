import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useTelegram } from "../../components/hooks/useTelegram";

import { IdeaContext } from "../../context/idea";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "./styles.scss";
import { TradePool } from "../../typings";
import InPopup from "./InPopup";

const TradingItemPage = () => {
  const { id } = useParams();

  const { tradePools } = useContext(IdeaContext);

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
  const { username, activeId, isLong, finalAmount, stopLoss, leverage, takeProfit } = tradePool;

  const openInModal = () => {
    setInModal(true);
  }

  const closeInModal = () => {
    setInModal(false);
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
              <div className="main_info_item">Pool: {finalAmount}</div>
              <div className="main_info_item">Stop Loss: {stopLoss}</div>
              <div className="main_info_item">Leverage: {leverage}</div>
              <div className="main_info_item">Take Profit: {takeProfit}</div>
            </div>
            <div className="main_pull">
              <div className="main_pullText">Pool volume</div>
              <div className="main_pullCircle">
                <CircularProgressbar
                  value={0}
                  maxValue={100}
                  text={`${0}`}
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
          <div className="list_item">
            <div className="list_item_name">Slavik</div>
            <div className="list_item_value">100%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingItemPage;
