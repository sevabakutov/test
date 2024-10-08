import MyButton from "../UI/buttons/MyButton";
import { useNavigate } from "react-router-dom";

import Filter from "../UI/filter/FIlter";
import MySearchInput from "../UI/input/MySearchInput";

const FilterToken = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
        padding: "10px",
      }}
    >
      <div
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1>Ideas</h1>
        <MyButton
          className="launchTokenBtn"
          onClick={() => navigate("/create-idea")}
        >
          Create Idea
        </MyButton>
      </div>

      <MySearchInput
        type="text"
        placeholder="Search"
      />

      <Filter
        filterObj={{
          buttonFilters: ["New", "Run"],
          selectFilters: ["All", "Traiding", "Alt Coin", "Crowdfunding"],
        }}
      />
    </div>
  );
};

export default FilterToken;
