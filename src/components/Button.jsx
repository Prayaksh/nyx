import React from 'react';
import './Button.css';

const Button = ({ value, onClick, className = '' }) => {
  return (
    <button 
      className={`btn ${className}`.trim()}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;