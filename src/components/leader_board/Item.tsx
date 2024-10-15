import React from "react";

export default function Item({ row }) {
    return (
        <li>
            <span className="item__name">{row.username}</span>
            <span className="item__score">{row.pnl}</span>
        </li>
    )
}