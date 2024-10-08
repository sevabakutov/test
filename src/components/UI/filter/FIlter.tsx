import React, { useState, useContext } from "react";

import filter from "./filter.module.css";

import { IdeaContext } from "../../../context/idea";

interface FilterTypeProps {
  filterObj: {
    buttonFilters: string[];
    selectFilters: string[];
  };
}

const Filter: React.FC<FilterTypeProps> = ({ filterObj }) => {
  const { setIdeaStatusFilter, setIdeaTypeFilter } = useContext(IdeaContext)!;

  const { buttonFilters, selectFilters } = filterObj;

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSelect, setActiveSelect] = useState("all");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setActiveSelect(value);
    setIdeaTypeFilter(value);
  };

  const handleBtnChange = (index: number) => {
    setActiveIndex(index);
    if (index) {
      setIdeaStatusFilter("run");
    } else {
      setIdeaStatusFilter("new");
    }
  };

  return (
    <div className={filter.wrapper}>
      <div className={filter.container}>
        <div className={filter.rating_block}>
          {buttonFilters.map((button, index) => (
            <div
              key={index}
              className={`${filter.rating_item} ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => handleBtnChange(index)}
            >
              {button}
            </div>
          ))}
        </div>
        <div className={filter.formType_block}>
          <select
            className={filter.formType_select}
            onChange={handleSelectChange}
          >
            {selectFilters.map((option, index) => (
              <option
                key={index}
                value={option.toLowerCase().replace(/\s/g, "")}
              >
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
