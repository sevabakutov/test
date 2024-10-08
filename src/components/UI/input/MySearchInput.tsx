import React from "react";
import classes from "./styles/MyInput.module.css";

interface MySearchInputPropsType {
  type: string,
  placeholder: string
}

const MySearchInput:React.FC<MySearchInputPropsType> = (props) => {
  const { type, placeholder } = props;

  return (
    <div className={classes.myInputWrapper}>
      <input
        className={classes.myInput}
        type={type}
        placeholder={placeholder}
      />
      <label className={classes.inputLabel} htmlFor="">
        {props.placeholder}
      </label>
    </div>
  );
};

export default MySearchInput;
