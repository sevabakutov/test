import React, { useState } from 'react';

const MyTimeInput = ({ onChange, tag }) => {
    const [time, setTime] = useState('');

    const handleTimeChange = (event) => {
        const newTime = event.target.value;
        setTime(newTime);
        onChange(newTime, tag);
    };

    return (
        <input
            type="date"
            value={time}
            onChange={handleTimeChange}
            className='timePicker'
        />
    );
};

export default MyTimeInput;
