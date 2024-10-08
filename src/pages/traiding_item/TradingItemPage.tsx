import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useTelegram } from "../../components/hooks/useTelegram";

import { IdeaContext } from "../../context/idea";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "./styles.scss";

const TradingItemPage = () => {
  const { id } = useParams();

  const { traidings } = useContext(IdeaContext);
  const { tg } = useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackButtonClick = () => navigate("/");

    tg.BackButton.hide();
    tg.BackButton.show();
    tg.BackButton.onClick(handleBackButtonClick);

    return () => {
      tg.BackButton.offClick(handleBackButtonClick);
    };
  }, [tg, navigate]);

  const selectTraiding = (traidings) => {
    const result = traidings.find((item) => item.id === id);
    return result;
  };

  const traiding = selectTraiding(traidings);
  const { active, isLong, pull, rating, risk, shelder, takeProfit } = traiding;

  console.log(pull);

  return (
    <div className="wrapper">
      <div className="container">
        <div className="header_block">
          <div className="header_container">
            <div className="createdBy">Created by</div>
            <div className="nick">@Peter_Parkur_2007</div>
          </div>
        </div>
        <div className="main_block">
          <div className="main_container">
            <div className="main_btns">
              <button
                style={{ backgroundColor: "#067c06" }}
                className="main_btn buy"
              >
                In
              </button>
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
              <div className="main_info_item">Acive: {active}</div>
              <div className="main_info_item">Long/Short: {isLong}</div>
              <div className="main_info_item">Pull: {pull}</div>
              <div className="main_info_item">Risk: {risk}</div>
              <div className="main_info_item">Shelder: {shelder}</div>
              <div className="main_info_item">Take Profit: {takeProfit}</div>
            </div>
            <div className="main_pull">
              <div className="main_pullText">Pull volume</div>
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
          <div className="list_item">
            <div className="list_item_name">Vitalik</div>
            <div className="list_item_value">1%</div>
          </div>
          <div className="list_item">
            <div className="list_item_name">Ibragim</div>
            <div className="list_item_value">23%</div>
          </div>
          <div className="list_item">
            <div className="list_item_name">Slavik</div>
            <div className="list_item_value">100%</div>
          </div>
          <div className="list_item">
            <div className="list_item_name">Vitalik</div>
            <div className="list_item_value">1%</div>
          </div>
          <div className="list_item">
            <div className="list_item_name">Ibragim</div>
            <div className="list_item_value">23%</div>
          </div>
          <div className="list_item">
            <div className="list_item_name">Slavik</div>
            <div className="list_item_value">100%</div>
          </div>
          <div className="list_item">
            <div className="list_item_name">Vitalik</div>
            <div className="list_item_value">1%</div>
          </div>
          <div className="list_item">
            <div className="list_item_name">Ibragim</div>
            <div className="list_item_value">23%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingItemPage;
