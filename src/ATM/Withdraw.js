import React, { useState } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import './withdraw.css';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NotificationManager from 'react-notifications/lib/NotificationManager';

const Withdraw = () => {

    const [transactionAmount, setAmount] = useState(0);
    const [accountNo, setAccountNo] = useState(0);
    const location = useLocation();
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
        var accNo = location.state;
        setAccountNo(accNo);
    }, [])


    function handleClick(e) {
        setAmount(Number(transactionAmount + e.target.innerHTML));
    }

    const handleCancel = () => {
        navigate("/landing", { state: accountNo });
    }

    const handleClear = () => {
        setAmount('');
    }

    const handleBackspace = () => {
        setAmount(Math.floor(transactionAmount / 10))
    }

    const handleEnter = () => {
        axios.post('https://localhost:7286/Transaction/withdraw', { accountNo: accountNo, transactionAmount: transactionAmount })
            .then(response => {
                const accounts = response.data;
                if (accounts) {
                    showNotification('success', "Account Number Verified: " + accountNo + " and Amount: ₹" + transactionAmount + " was withdrawn");
                    setAmount('');
                } else {
                    showNotification('error', "Invalid Account Number or Amount, Please enter valid Account Number or Amount.");
                }
            })
            .catch(error => {
                showNotification('error', "An error occurred. Please try again later.");
            });
    }

    return (
        <div className='withdrawBG'>
            <div className='withdraw-body'>
                <div className='withdraw-header'>
                    <h3>Enter Amount to Withdraw</h3>
                </div>
                <div className="withdraw-container">
                    <div className="withdraw-output">
                        <input type="text" value={transactionAmount} disabled />
                    </div>
                    <div className="withdraw">
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

export default Withdraw;
