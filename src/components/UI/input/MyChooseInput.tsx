import { FC, useState } from "react";
import classes from "./styles/myChooseInput/MyChooseInput.module.css";
import "./styles/myChooseInput/MyChooseInput.css";
import input from "./styles/MyInput.module.css";

interface MyChooseInputProps {
  tag: string;
  title: string;
  min?: number;
  max?: number;
  variants: (string | number)[];
  onChange: (value: string | number | boolean, traidingParam: string) => void;
  price: boolean;
}

const MyChooseInput: FC<MyChooseInputProps> = (props) => {
  const { tag, title, min, max, variants, onChange, price } = props;

  const [inputValue, setInputValue] = useState<string | number>("");
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isorderInput, setOrderInput] = useState<boolean>(false);

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value.replace(/[^0-9]/g, "");
    setInputValue(value);
    onChange(value, tag);

    if (value < min) {
      if (inputValue !== min) {
        setInputValue(min);
        onChange(min, tag);
      }
    } else if (value > max) {
      if (inputValue !== max) {
        setInputValue(max);
        onChange(max, tag);
      }
    } else {
      if (inputValue !== value) {
        setInputValue(value);
        onChange(value, tag);
      }
    }
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = +event.target.value;

    if (!value) {
      setIsDisabled(false);
      setInputValue("");
      setActiveIndex(0);
      const newIndex = 0;

      variants.forEach((item, index) => {
        if (newIndex === index) {
          onChange(item, tag);
        }
      });
    } else {
      setActiveIndex(null);
      setIsDisabled(true);

      if (value < min) {
        if (inputValue !== min) {
          setInputValue(min);
          onChange(min, tag);
        }
      } else if (value > max) {
        if (inputValue !== max) {
          setInputValue(max);
          onChange(max, tag);
        }
      } else {
        if (inputValue !== value) {
          setInputValue(value);
          onChange(value, tag);
        }
      }
    }
  };

  const handleVariantClick = (i: number) => {
    setActiveIndex(i);
    variants.forEach((variant, index) => {
      if (i === index) {
        if (price) {
          onChange(variant, tag);
        } else if (tag == "order") {
          if (i === 0) {
            setOrderInput(false);
            onChange(false, "isOrder");
            setInputValue("");
            onChange(1, tag);
          } else {
            onChange(true, "isOrder");
            setOrderInput(true);
          }
        }else {
          if (variant == "Long") {
            onChange(true, tag)
          }else {
            onChange(false, tag)
          }
        }
      }
    });
    // if (price) {
    //   variants.forEach((item, index) => {
    //     if (i === index) {
    //       onChange(item, tag);
    //     }
    //   });
    // } else {
    //   if (tag == "order") {
    //     if (i === 0) {
    //       setOrderInput(false);
    //       onChange(false, "isOrder");
    //       setInputValue("");
    //       onChange(1, tag);
    //     } else {
    //       onChange(true, "isOrder");
    //       setOrderInput(true);
    //     }
    //   } else {
    //     variants.for
    //   }
    // }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>{title}</div>
      <div className={classes.variants_block}>
        {variants.map((variant, i) => (
          <div
            key={i}
            className={`${classes.variants_item} ${
              i === activeIndex ? "chooseActive" : ""
            }`}
            onClick={() => handleVariantClick(i)}
            style={{ pointerEvents: isDisabled ? "none" : "auto" }}
          >
            <span>
              {typeof variant === "string"
                ? variant
                : variant == 0
                ? "None"
                : variant + "%"}
            </span>
          </div>
        ))}

        {price && (
          <input
            placeholder="Price"
            type="number"
            className={classes.input}
            value={inputValue}
            onChange={(e) => handlePriceChange(e)}
            maxLength={2}
          />
        )}
      </div>
      {isorderInput && (
        <div className={input.myInputWrapper}>
          <input
            onChange={(e) => handleOrderChange(e)}
            value={inputValue}
            className={input.myInput}
            max={max}
          />
          <label className={input.inputLabel} htmlFor="">
            Set order
          </label>
        </div>
      )}
    </div>
  );
};

export default MyChooseInput;
