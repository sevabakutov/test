import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useTelegram } from "../../components/hooks/useTelegram";

import "./styles.scss";
import ProfileHeader from "./components/Header";
import ProfileHistoryPool from "./components/HistoryPool";
import Help from "./components/Help";
import { UserContext } from "../../context/profile";
import { useTonConnect } from "../../components/hooks/useTonConnect";

const Profile = () => {
  const { user } = useContext(UserContext);


  const { tg } = useTelegram();
  const navigate = useNavigate();

  const { wallet } = useTonConnect();
  console.log(wallet);

  useEffect(() => {
    const handleBackButtonClick = () => navigate("/");

    tg.BackButton.show();
    tg.BackButton.onClick(handleBackButtonClick);

    return () => {
      tg.BackButton.offClick(handleBackButtonClick);
    };
  }, [tg, navigate]);

  console.log("Profile, user's trade pools:", user.tradePools);

  return (
    <div className="profile__wrapper">
      <div className="profile__container">
        <ProfileHeader username={user.username} img={user.img} />
        <ProfileHistoryPool pools={user.tradePools} pnl={user.pnl} />
        <Help />
      </div>
    </div>
  );
};

export default Profile;
