import React from "react";

const Help = () => {
  return (
    <div className="help__wrapper">
      <div className="help__container">
        <div className="help__title">Help</div>
        <div className="help__quiestions">
          <div
            onClick={() =>
              (window.location.href = "https://hashcashton.com/explation")
            }
            className="help__questions__item"
          >
            How to create and promote pool?
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
