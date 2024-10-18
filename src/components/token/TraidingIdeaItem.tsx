import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./tokenGLobal.scss";

import ArrowDown from "../../assets/Icons/Arrow-down";
import ArrowUp from "../../assets/Icons/Arrow-up";

import { useNavigate } from "react-router-dom";

import { TradePool } from "../../typings";

interface TradePoolItemProps {
  tradePool: TradePool;
}

const TradePoolItem: React.FC<TradePoolItemProps> = ({ tradePool }) => {
  const {
    id,
    isLong,
    username,
    activeId,
    finalAmount,
    leverage,
    stopLoss,
    takeProfit,
    currValue
  } = tradePool;

  const navigate = useNavigate();

  return (
    <>
      <div className="idea_item" onClick={() => navigate(`/traidings/${id}`)}>
        <div className="idea__wrapper">
          <div className="idea_item_info_block">
            <div className="idea_item_info_header">
              <div className="idea_item_iconBlock">
                {isLong ? <ArrowUp /> : <ArrowDown />}
              </div>
              <div className="idea_item_info_header_title">
                <div className="idea_item_name color_white ">
                  ${activeId == 1 ? "USDT" : "TON"}
                </div>
                {/* их много */}
                <div className="idea_item_pull">
                  <span className="color_white">Pool:</span> {finalAmount}
                </div>
                <div className="idea_item_pull">
                  <span className="color_white">Current amount:</span> {currValue}
                </div>
              </div>
              <div className="idea_item_info_main">
                <div className="idea_item_info_main_item">
                  <span className="color_white">Levegare:</span> {leverage}
                </div>
                <div className="idea_item_info_main_item">
                  <span className="color_white">Stop loss:</span>
                  {(stopLoss == 0 || stopLoss == null) ? "None" : stopLoss}
                </div>
                <div className="idea_item_info_main_item">
                  <span className="color_white">Take profit:</span> {takeProfit}
                </div>
                <div className="idea_item_info_main_item">
                  <span className="color_white">Date:</span>
                  {"  <1d"}
                </div>
              </div>

              <div className="idea_item_info_rating">
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
          <div className="idea_item_createdBy-block">
            <div className="idea_item_createdBy_name">@{username}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TradePoolItem;
