import React, { useState, useContext } from 'react';
import { WebSocketContext } from '../../context/socet';
import { sendMessage } from '../../ws/events';

import './styles.scss';
import { TradeInvestment, TradePool } from '../../typings';
import { UserContext } from '../../context/profile';


const InPopup = ({ tradePool, closeModal }) => {

    const { send } = useContext(WebSocketContext);
    const { user } = useContext(UserContext);

    const [value, setValue] = useState<number>(0);

    const handleInOnClick = () => {
        const updatedTradePool: TradePool = {
          ...tradePool,
          currValue: +tradePool.currValue + +value,
          inAmount: tradePool.inAmount + 1,
        };

        const investment: TradeInvestment = {
            userId: user.id,
            username: user.username,
            tradeIdea: updatedTradePool.id,
            amountInvested: +value,
            time: new Date()
        }
        
        sendMessage("trade_pool", "update", send, {
            "pool": updatedTradePool,
            "investment": investment
        });
    
        setValue(0);
        closeModal();
      };

    const handleOnChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <div className="modal-overlay">
        <div className="modal-content">
            <span className="close" onClick={closeModal}>×</span>
            <h2>Enter Number</h2>
            <input
                onChange={(event) => handleOnChange(event)} 
                type="number" 
                pattern="[0-9]*" 
                placeholder="0-9" />
            <button onClick={handleInOnClick}>Send</button>
        </div>
        </div>
    );
};

export default InPopup;