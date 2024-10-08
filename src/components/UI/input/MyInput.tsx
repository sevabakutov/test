import React from "react";
import classes from "./styles/MyInput.module.css";

interface MyInputProps {
  tag: string;
  value?: string | number;
  onChange: (value: string | number, traidingParam: string) => void;
  type: string;
  placeholder: string;
  min: number;
}

const MyInput: React.FC<MyInputProps> = (props) => {
  const { tag, value, min, onChange, type, placeholder } = props;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value;
    if (type == "number") {
      value = +e.target.value;
    } else {
      value = e.target.value;
    }

    onChange(value, tag);
  };

  return (
    <div className={classes.myInputWrapper}>
      <input
        className={classes.myInput}
        value={value}
        onChange={(e) => handleInputChange(e)}
        type={type}
        placeholder={placeholder}
        min={min}
      />
      <label className={classes.inputLabel} htmlFor="">
        {props.placeholder}
      </label>
    </div>
  );
};

export default MyInput;
