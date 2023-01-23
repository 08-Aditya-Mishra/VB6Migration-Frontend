import React, { useState } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import './BalanceEnquiry.css'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NotificationManager from 'react-notifications/lib/NotificationManager';

const BalanceEnquiry = () => {
    const [accountName, setAccountName] = useState(null);
    const [amount, setAmount] = useState(null);
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

    const handleClick = () => {
        navigate("/landing", { state: accountNo });
    }

    useEffect(() => {
        var accountNo = location.state;
        setAccountNo(accountNo);
        axios.get('http://localhost:5058/api/Account/' + accountNo)
            .then(response => {
                const account = response.data[0];
                if (account) {
                    setAccountName(account.accountName);
                    setAmount(account.amount)
                    showNotification('info', 'This is your remaining amount in your account');
                } else {
                    // show an error message
                    showNotification('error', 'Invalid account number: '+accountNo);
                }
            })
            .catch(error => {
                console.log(error);
                showNotification('error', 'An error occurred. Please try again later.');
            });
    }, []);

    return (
        <>
            <div className='Balance-container'>
                <table className="table-structure">
                    <tr>
                        <th className="table-header">Balance Remaining in Account</th>
                    </tr>
                    <tr>
                        <td>Account Name: {accountName}</td>
                    </tr>
                    <tr>
                        <td>Account Number: {accountNo}</td>
                    </tr>
                    <tr>
                        <td>Remaining Balance: {amount}</td>
                    </tr>
                </table>
                <div className="text-center mt-4">
                    <button onClick={handleClick} className="btn btn-dark">Close</button>
                </div>
            </div>

        </>
    );
}


export default BalanceEnquiry;
