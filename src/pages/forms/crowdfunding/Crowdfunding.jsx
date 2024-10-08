import { useCallback, useContext, useEffect, useState } from "react";
import { useTelegram } from "../../../components/hooks/useTelegram";
import { useNavigate } from "react-router-dom";

import MyPhotoInput from "../../../components/UI/input/MyPhotoInput";
import MyInput from "../../../components/UI/input/MyInput";

import { IdeaContext } from "../../../context/index";

import { v4 as uuidv4 } from "uuid";

import '../form.scss'

const CrowdfundingComponent = () => {
  const [croud, setCroud] = useState({
    id: "",
    img: "",
    pull: "",
    result: "",
    desc: "",
  });
  const croudId = uuidv4();

  const { createCround } = useContext(IdeaContext);

  const onChangeCroud = useCallback((value, croundParam) => {
    setCroud((prevState) => ({
      ...prevState,
      [croundParam]: value,
    }));
  }, []);
  const { tg } = useTelegram();
  const navigate = useNavigate();

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
    const addNewCroud = () => {
      const newIdea = {
        ...croud,
        id: croudId,
        createdAt: new Date(),
      };

      createCround(newIdea);

      tg.MainButton.hide();
      navigate("/hash-cash-front-end");
    };

    tg.MainButton.onClick(addNewCroud);

    if (!croud.pull || !croud.img || !croud.result) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }

    return () => {
      tg.MainButton.offClick(addNewCroud);
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCround = {
      ...croud,
      id: croudId,
      createdAt: new Date(),
      type: "crowdfunding",
    };
    createCround(newCround);

    navigate("/hash-cash-front-end");
  };

  return (
    <div className="form_wrapper">
      <form onSubmit={handleSubmit} className="form">
        <div className="form_title">Fill out Crowdfunding form</div>
        <div className="form_block">
          <MyPhotoInput tag="img" onChange={onChangeCroud} />

          <MyInput
            tag={"pool"}
            value={croud.pull}
            onChange={onChangeCroud}
            type="number"
            placeholder="Input pull"
          />
          <MyInput
            tag={"desc"}
            value={croud.desc}
            onChange={onChangeCroud}
            placeholder="Describtion (Optional)"
            type="text"
          />
          <MyInput
            tag={"result"}
            value={croud.result}
            onChange={onChangeCroud}
            placeholder="Input final result"
            type="number"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CrowdfundingComponent;
