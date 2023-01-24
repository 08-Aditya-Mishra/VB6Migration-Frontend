import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import './DialKeypad.css'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import NotificationManager from 'react-notifications/lib/NotificationManager';

const DialKeypad = () => {
    const [accountNo, setAccountNo] = useState(0);
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

    function handleClick(e) {

        setAccountNo(Number(accountNo + e.target.innerHTML));
    }

    const handleCancel = () => {
        navigate('/', { state: 0 });
    }

    const handleClear = () => {
        setAccountNo('');
    }

    const handleBackspace = () => {
        setAccountNo(Math.floor(accountNo / 10));
    }

    const handleEnter = () => {
        axios.get('http://localhost:5178/api/Account/' + accountNo)
            .then(response => {
                const account = response.data;
                console.log(account)
                if (account.length > 0) {
                    navigate('/fingerprint', { state: accountNo });
                    showNotification('success', 'Congratulations, Account is Verified');
                } else {
                    // show an error message
                    showNotification('error', 'Please, Enter Valid Account Number!');
                }
            })
            .catch(error => {
                console.log(error);
                showNotification('error', 'An error occurred. Please try again later.');
            });
    }

    return (
        <div className='keypadBG'>
            <div className='keypad-body'>
                <div className='keypadHeader'>
                    <h3>Enter your Account Number</h3>
                </div>
                <div className="keypad-container">
                    <div className="output">
                        <input type="text" value={accountNo} disabled />
                    </div>
                    <div className="keypad">
                        <button onClick={handleClick}>1</button>
                        <button onClick={handleClick}>2</button>
                        <button onClick={handleClick}>3</button>
                        <button onClick={handleClick}>4</button>
                        <button onClick={handleClick}>5</button>
                        <button onClick={handleClick}>6</button>
                        <button onClick={handleClick}>7</button>
                        <button onClick={handleClick}>8</button>
                        <button onClick={handleClick}>9</button>
                        <button onClick={handleClick}>0</button>
                        <button onClick={handleBackspace}>&larr;</button>
                    </div>
                    <div>
                        <button className="kbutton" onClick={handleClear}>Clear</button>
                        <button className="kbuttonEnter" onClick={handleEnter}>Enter</button>
                        <button className="kbutton" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default DialKeypad;
