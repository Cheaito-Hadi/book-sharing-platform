import React from "react";
import "./styles.css";

const Input = ({label, placeholder, value, onChange, type, name}) => {
    return (
        <div className="input-wrapper">
            <label>{label}</label>
            <input className="input-main" placeholder={placeholder} value={value} onChange={onChange} type={type} name={name}/>
        </div>
    );
};

export default Input;