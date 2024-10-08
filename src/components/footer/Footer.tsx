import HomeIcon from "../../assets/Icons/Home";
import TasksIcon from "../../assets/Icons/Task";
import WalletIcon from "../../assets/Icons/Wallet";

import "./footer.scss";

interface FooterProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ activePage, setActivePage }) => {
  const handleOnItemClick = (item: string) => {
    switch (item) {
      case "home": {
        setActivePage("home");
        break;
      }
      case "task": {
        setActivePage("task");
        break;
      }
      case "wallet": {
        setActivePage("wallet");
        break;
      }
    }
  };

  return (
    <footer className="footer">
      <div
        className={`footer__item ${activePage == "home" ? "active" : ""} `}
        onClick={() => handleOnItemClick("home")}
      >
        <HomeIcon
          active={activePage == "home" ? true : false}
          className="footer__item__icon"
        />
        <div className="footer__item__title ">Home</div>
      </div>
      <div
        className={`footer__item ${activePage == "task" ? "active" : ""}`}
        onClick={() => handleOnItemClick("task")}
      >
        <TasksIcon
          active={activePage == "task" ? true : false}
          className="footer__item__icon"
        />
        <div className="footer__item__title">Tasks</div>
      </div>
      <div
        className={`footer__item ${activePage == "wallet" ? "active" : ""}`}
        onClick={() => handleOnItemClick("wallet")}
      >
        <WalletIcon
          active={activePage == "wallet" ? true : false}
          className="footer__item__icon"
        />
        <div className="footer__item__title">Wallet</div>
      </div>
    </footer>
  );
};

export default Footer;
