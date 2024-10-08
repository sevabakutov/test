import { FC, useState } from "react";
import MyInput from "../input/MyInput";

import select from "./MySelect.module.css";

interface MySelectProps {
  tag: string;
  defaultValue: string;
  onChange: (value: string | number | boolean, traidingParam: string) => void;
  options: { value: string | number; name: string }[];
  withInput: boolean;
  type: string;
}

const MySelect: FC<MySelectProps> = (props) => {
  const { tag, options, defaultValue, onChange, withInput, type } = props;

  const [showInput, setShowInput] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<string | boolean>(
    defaultValue
  );

  const handleSelectChange = (selectedValue: string) => {
    
    if (tag === "activeId") {
      onChange(selectedValue, tag);

    } else if (selectedValue == "long") {
      onChange(true, tag)
      setSelectValue(true);

    } else if (selectedValue == "short") {
      onChange(false, tag)
      setSelectValue(false);

    } else if (withInput) {
      if (selectedValue === "order") {
        setShowInput(true);
      } else {
        setShowInput(false);
        onChange(1, tag);
      }
    }
  };

  return (
    <div>
      <select
        onChange={(event) => handleSelectChange(event.target.value)}
        defaultValue={defaultValue}
        className={select.select}
      >
        <option value={defaultValue} disabled hidden>
          {defaultValue}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      {withInput && (
        <div className={`slide-input ${showInput ? "show" : ""}`}>
          <MyInput
            tag={tag}
            onChange={onChange}
            type={type}
            placeholder="Input order"
          />
        </div>
      )}
    </div>
  );
};

export default MySelect;
