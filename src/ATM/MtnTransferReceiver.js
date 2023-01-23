import React from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
import './MtnTransferReceiver.css'
import axios from 'axios';
import NotificationManager from 'react-notifications/lib/NotificationManager';

const MtnTransferReceiver = () => {

    const [receiverAccountNo, setReceiverAccountNo] = useState(0);
    const [accountNo, setAccountNo] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

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
        setReceiverAccountNo(Number(receiverAccountNo + e.target.innerHTML));
    }

    const handleCancel = () => {
        navigate('/', { state: 0 });
    }

    const handleClear = () => {
        setReceiverAccountNo('');
    }

    const handleBackspace = () => {
        setReceiverAccountNo(Math.floor(receiverAccountNo / 10));
    }

    const handleEnter = () => {
        axios.get('http://localhost:5058/api/Account/' + receiverAccountNo)
            .then(response => {
                const accounts = response.data;
                console.log(accounts)
                if (accounts.length > 0) {
                    if(accountNo == receiverAccountNo){
                        showNotification('error', "You cannot transfer funds to your own account. Please enter a valid recipient's account number.");
                    }
                    else{
                    navigate('/transferamount', { state: { accountNo: accountNo, receiverAccountNo: receiverAccountNo } });
                    showNotification('success', "Recepient's account number verified");
                    }
                } 
                else {
                    showNotification('info', 'Invalid Account Number: {'+receiverAccountNo+'} Please enter a valid account number for the recipient');
                }
            })
            .catch(error => {
                showNotification('error', "An error occurred. Please try again later.");
            });
    }

    return (
        <div>
            <div className='transfer-body'>
                <div className='transfer-header'>
                    <h3>Enter Receiver's Account Number</h3>
                </div>
                <div className="transfer-container">
                    <div className="transfer-output">
                        <input type="text" value={receiverAccountNo} disabled />
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

export default MtnTransferReceiver
