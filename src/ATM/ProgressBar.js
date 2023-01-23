import React, { useState, useEffect } from 'react';
import './ProgressBar.css';
import { useNavigate } from 'react-router-dom';
import NotificationManager from 'react-notifications/lib/NotificationManager';

const ProgressBar = () => {
  const [percentage, setPercentage] = useState(0);
  const navigate = useNavigate();

  //Notifications 
  const showNotification = (type, message) => {
    switch (type) {
      case 'success':
        NotificationManager.success(message);
        break;
      case 'warning':
        NotificationManager.warning(message);
        break;
      case 'error':
        NotificationManager.error(message);
        break;
      default:
        NotificationManager.info(message);
    }
  }

  useEffect(() => {
    let intervalId = null;
    const start = Date.now();
    showNotification('success', 'Welcome to the My Bank ATM');
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
        <img src={require('./atm_img.png')} className="atm-img" alt="ATM machine" />
        <div className="progress-bar" style={{ width: `${percentage}%` }}>
          <span>{percentage}%</span>
        </div>
      </div>

    </body>

  );
}

export default ProgressBar;
