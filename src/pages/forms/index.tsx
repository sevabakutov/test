import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../../components/hooks/useTelegram";

import "./form.scss"; //

interface FormPageProps {
  TraidingComponent?: () => JSX.Element;
  AltCoinComponent?: () => JSX.Element;
  CrowdfundingComponent?: () => JSX.Element;
}

const Index: FC<FormPageProps> = ({
  TraidingComponent,
  AltCoinComponent,
  CrowdfundingComponent,
}) => {
  const [activeTab, setActiveTab] = useState<string>("trading");
  const { tg } = useTelegram();

  const getActiveComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const handleBackButtonClick = () => navigate("/");

      tg.BackButton.show();
      tg.BackButton.onClick(handleBackButtonClick);

      return () => {
        tg.BackButton.offClick(handleBackButtonClick);
      };
    }, [tg, navigate]);

    switch (activeTab) {
      case "trading":
        return <TraidingComponent />;
      case "altcoin":
        return <AltCoinComponent />;
      case "crowdfunding":
        return <CrowdfundingComponent />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="navbar">
        <button
          className={`navbar__button ${
            activeTab === "trading" ? "navbar__button--active" : ""
          }`}
          onClick={() => setActiveTab("trading")}
        >
          Trading
        </button>
        <button
          className={`navbar__button ${
            activeTab === "altcoin" ? "navbar__button--active" : ""
          }`}
          //   onClick={() => setActiveTab("altcoin")}
        >
          Alt-Coin
        </button>
        <button
          className={`navbar__button ${
            activeTab === "crowdfunding" ? "navbar__button--active" : ""
          }`}
          //   onClick={() => setActiveTab("crowdfunding")}
        >
          Crowdfunding
        </button>
      </div>
      <div className="content">{getActiveComponent()}</div>
    </div>
  );
};

export default Index;
