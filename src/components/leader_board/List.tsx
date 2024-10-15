import React from "react";
import Item from "./Item";
import "./leaderboard.scss";

export default function List({ data }) {
    return (
        <ul className="item_wrapper">
            {data.map((row, index) => (
                <Item row={{ username: row[0], pnl: row[1] }} key={index} />
            ))}
        </ul>
    );
}