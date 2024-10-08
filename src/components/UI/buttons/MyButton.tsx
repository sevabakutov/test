import React from "react";
import classes from './MyButton.module.css';

interface MyButtonProps {
    children: React.ReactNode;  
    className: string;
    [key: string]: any;  
}

const MyButton: React.FC<MyButtonProps> = ({ children, className, ...props }) => {
    return (
        <button {...props} className={`${classes[className]} ${props.className}`}>
            {children}
        </button>
    );
}

export default MyButton;