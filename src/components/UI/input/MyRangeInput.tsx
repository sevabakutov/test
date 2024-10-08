import {useRef, useState } from "react";
import classes from "./styles/MyRangeInput.module.css";

interface MySelectProps {
  onChange: (value: string | number, traidingParam: string) => void;
}

interface Colors {
  [key: string]: string;
}

const MyRangeInput:React.FC<MySelectProps> = ({onChange}) => {
  const [value, setValue] = useState<number>(2);

  const markRefs = {
    x10: useRef<HTMLSpanElement>(null),
    x20: useRef<HTMLSpanElement>(null),
    x30: useRef<HTMLSpanElement>(null),
    x40: useRef<HTMLSpanElement>(null),
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: number= +event.target.value;

    onChange(value, "leverage") 
    setValue(value);

    const newGradient = `linear-gradient(to right, #336daf ${
      value * 2 - 3
    }%, #ccc ${value * 2 - 3}%)`;
    event.target.style.background = newGradient;
    
    const colors: Colors = {
      x10: value >= 9.5 ? '#336daf' : '#ccc',
      x20: value >= 19.5 ? '#336daf' : '#ccc',
      x30: value >= 29.5 ? '#336daf' : '#ccc',
      x40: value >= 39.5 ? '#336daf' : '#ccc'
    };

    Object.entries(markRefs).forEach(([key, ref]) => {
      if (ref.current) {
        ref.current.style.backgroundColor = colors[key];
      }
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.info_block}>
          <div className={classes.title}>Leverage</div>
          <div className={classes.value}>
            <span>x</span>
            {value}
          </div>
        </div>
        <input
          className={classes.input}
          min="2"
          max="50"
          type="range"
          value={value}
          onChange={handleChange}
          step="0.5"
        />
        <div className={classes.marks}>
        <span ref={markRefs.x10} className={classes.markItem}>
            <span>x</span>10
          </span>
          <span ref={markRefs.x20} className={classes.markItem}>
            <span>x</span>20
          </span>
          <span ref={markRefs.x30} className={classes.markItem}>
            <span>x</span>30
          </span>
          <span ref={markRefs.x40} className={classes.markItem}>
            <span>x</span>40
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyRangeInput;
