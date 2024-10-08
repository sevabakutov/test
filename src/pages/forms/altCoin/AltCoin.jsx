import { useEffect, useState, useContext, useCallback } from "react";
import { useTelegram } from "../../../components/hooks/useTelegram";
import { useNavigate } from "react-router-dom";

import MyInput from "../../../components/UI/input/MyInput";
import MyPhotoInput from "../../../components/UI/input/MyPhotoInput";
import MySelect from "../../../components/UI/select/MySelect";
import MyTimeInput from "../../../components/UI/input/MyTimeInput";

import { IdeaContext } from "../../../context/index";

import { v4 as uuidv4 } from "uuid";

import "../form.scss";

const AltCoinComponent = () => {
  //type
  const { tg } = useTelegram();
  const { createAltCoin } = useContext(IdeaContext);

  const [altCoin, setAltCoin] = useState({});
  const navigate = useNavigate();

  const altCoinId = uuidv4();


  const onChangeAltCoin = useCallback((value, altCoinParam) => {
    setAltCoin((prevState) => ({
      ...prevState,
      [altCoinParam]: value,
    }));
  }, []);
  useEffect(() => {
    const handleBackButtonClick = () =>
      navigate("/hash-cash-front-end/create-idea");

    tg.BackButton.show();
    tg.BackButton.onClick(handleBackButtonClick);

    return () => {
      tg.BackButton.offClick(handleBackButtonClick);
    };
  }, [tg, navigate]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Create",
    });
  }, [tg.MainButton]);

  useEffect(() => {
    const addNewIdea = () => {
      const newIdea = {
        ...altCoin,
        id: altCoinId,
        createdAt: new Date(),
        type: "altcoin",
      };

      createAltCoin(newIdea);

      tg.MainButton.hide();
      navigate("/hash-cash-front-end");
    };

    tg.MainButton.onClick(addNewIdea);

    if (!altCoin.active || !altCoin.pull || !altCoin.time || !altCoin.img) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }

    return () => {
      tg.MainButton.offClick(addNewIdea);
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIdea = {
      ...altCoin,
      id: altCoinId,
      createdAt: new Date(),
      type: "altcoin",
    };
    createAltCoin(newIdea);

    navigate("/hash-cash-front-end");
  };

  return (
    <div className="form_wrapper">
      <div className="form_title">Fill out Alt Coin form</div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form_block">
          <MyPhotoInput tag="img" onChange={onChangeAltCoin} />
          <MyInput
            tag={"active"}
            value={altCoin.active}
            onChange={onChangeAltCoin}
            type="text"
            placeholder="Input active"
          />

          <MyInput
            tag={"sellPrice"}
            value={altCoin.sellPrice}
            onChange={onChangeAltCoin}
            type="number"
            placeholder="Input Order Sell Price"
          />

          <MyInput
            tag={"pool"}
            value={altCoin.pull}
            onChange={onChangeAltCoin}
            type="text"
            placeholder="Input pull"
          />

          <MyTimeInput tag={"time"} onChange={onChangeAltCoin} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AltCoinComponent;
