import React, { useState, useEffect } from 'react';
import './ProgressBar.css';
import { useNavigate } from 'react-router-dom';

const ProgressBar = () => {
  const [percentage, setPercentage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let intervalId = null;
    const start = Date.now();
    intervalId = setInterval(() => {
      const elapsed = Date.now() - start;
      const newPercentage = Math.round((elapsed / 3000) * 100);
      if (newPercentage < 80) {
        setPercentage(newPercentage);
      } else {
        clearInterval(intervalId);
        setPercentage(100);
        navigate('/keypad');
      }
    }, 20);
    return () => clearInterval(intervalId);
  }, [])
  return (
    <body className="background">
    <div className="progress-bar-container">
      <img src={require('./atm_img.png')} className="atm-img" alt="ATM machine"/>
      <div className="progress-bar" style={{width: `${percentage}%`}}>
        <span>{percentage}%</span>
      </div>
    </div>

    </body>
   
  );
}

export default ProgressBar;
