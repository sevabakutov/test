import React, { useContext } from "react";
import avatar from "../../../assets/images/logo.jpg";
import { ProfileContext } from "../../../context/profile";
import { useTonConnect } from "../../../components/hooks/useTonConnect";
import { Address } from "@ton/core";
import { TonConnectButton } from "@tonconnect/ui-react";


interface ProfileHeaderProps {
  username: string;
  img: null | string;
}
const ProfileHeader: React.FC<ProfileHeaderProps> = ({username, img}) => {

  return (
    <div className="profile__header__wrapper">
      <div className="profile__header">
        <div className="profile__header__title">
          <div className="profile__header__nick">
            <div className="profile__header__avatar">
              <img
                className="profile__header__avatar__img"
                src={avatar}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div className="about__wrapper">
        <div className="about__wrapper__container">
          <div className="about__title">Accout</div>
          <div className="about__info">
            <div className="about__info__item">
              <div className="about__info__item__subtitle">Username</div>
              <div className="about__info__item__title">{username}</div>
            </div>
            <div className="about__info__item">
              <div className="about__info__item__subtitle">Wallet Address</div>
              <div className="about__info__item__title">
                <TonConnectButton className="connectWalletBtn" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
