import React, { useState } from 'react';
import Button from './Button';
import Display from './Display';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [operator, setOperator] = useState(null);
  const [prevValue, setPrevValue] = useState(null);

  const handleClick = (val) => {
    if (/[0-9.]/.test(val)) {
      // number or decimal
      setDisplay((prev) => (prev === '0' && val !== '.' ? val : prev + val));
    } else if (val === 'C') {
      setDisplay('0');
      setOperator(null);
      setPrevValue(null);
    } else if (val === '=') {
      if (operator && prevValue !== null) {
        const result = evaluate(prevValue, display, operator);
        setDisplay(String(result));
        setOperator(null);
        setPrevValue(null);
      }
    } else {
      // operator
      if (operator && prevValue !== null) {
        const result = evaluate(prevValue, display, operator);
        setPrevValue(result);
        setDisplay('0');
      } else {
        setPrevValue(display);
        setDisplay('0');
      }
      setOperator(val);
    }
  };

  const evaluate = (a, b, op) => {
    const x = parseFloat(a);
    const y = parseFloat(b);
    switch (op) {
      case '+': return x + y;
      case '-': return x - y;
      case '*': return x * y;
      case '/': return y !== 0 ? x / y : 'Error';
      default: return y;
    }
  };

  const buttons = [
    'C', '/', '*', '-', '+', '=',
    '7', '8', '9',
    '4', '5', '6',
    '1', '2', '3',
    '0', '.'
  ];

  return (
    <div className="calculator">
      <Display value={display} />
      <div className="buttons">
        {buttons.map((b) => (
          <Button 
            key={b}
            value={b}
            onClick={() => handleClick(b)}
            className={['C', '=', '/', '*', '-', '+'].includes(b) ? 'operator' : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;