import { useState, useEffect } from "react";
import { TonConnectButton } from "@tonconnect/ui-react";

import "./Header.css";
import ProfileIcon from "../../assets/Icons/ProdileIcon";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.jpg";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={`header `}>
      <div className="header_container">
        <div className="header_title">
          <div className="logo_wrapper">
            <img className="logo" src={logo} alt="" />
          </div>
          <span className="logo-text">Hash Cash</span>
        </div>

        <div
          onClick={() => navigate("/profile")}
          className="profile_btn"
        >
          <ProfileIcon />
        </div>
      </div>
      <TonConnectButton className="connectWalletBtn" />
    </header>
  );
};

export default Header;
