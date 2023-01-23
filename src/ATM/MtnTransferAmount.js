import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
import './MtnTransferReceiver.css'
import axios from 'axios';
import NotificationManager from 'react-notifications/lib/NotificationManager';

const MtnTransferAmount = () => {

    const [receiverAccountNo, setReceiverAccountNo] = useState(0);
    const [accountNo, setAccountNo] = useState(0);
    const [transactionAmount, setTransactionAmount] = useState(0);

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
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {     
        const { accountNo, receiverAccountNo } = location.state;
        setAccountNo(accountNo);
        setReceiverAccountNo(receiverAccountNo);
    }, [])

    function handleClick(e) {
        setTransactionAmount(Number(transactionAmount + e.target.innerHTML));
    }

    const handleCancel = () => {
        navigate("/landing", { state: accountNo });
    }

    const handleClear = () => {
        setTransactionAmount('');
    }

    const handleBackspace = () => {
        setTransactionAmount(Math.floor(receiverAccountNo / 10));
    }

    const handleEnter = () => {
        axios.post('http://localhost:5058/Transaction/transfer/',
            { sendersAccountNo: accountNo, receiversAccountNo: receiverAccountNo, transactionAmount: transactionAmount })
            .then(response => {
                if (response.status === 200) {
                    setTransactionAmount('');
                    showNotification('success', "Account Number Verified: " + receiverAccountNo + " and Amount: Rs." + transactionAmount + " was transferred");
                }
                else {
                    showNotification('error', "Transfer failed: "+response.status);
                }
            })
            .catch(error => {
                showNotification('info',"An error occurred. Please try again later.");
            });
    }

    return (
        <div>
            <div className='transfer-body'>
                <div className='transfer-header'>
                    <h3>Enter Amount to Transfer</h3>
                </div>
                <div className="transfer-container">
                    <div className="transfer-output">
                        <input type="text" value={transactionAmount} disabled />
                    </div>
                    <div className="transfer">
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
    )
}

export default MtnTransferAmount
