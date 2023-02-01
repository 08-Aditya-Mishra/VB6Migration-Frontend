import React from 'react';
import './MiniStatement.css'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NotificationManager from 'react-notifications/lib/NotificationManager';

const MiniStatement = () => {

    const [accountNo, setAccountNo] = useState(0);
    const [transactions, setTransactions] = useState([]);
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
    var a = 0;
    useEffect(() => {
        var accountNo = location.state;
        setAccountNo(accountNo);
        axios.get('https://localhost:7286/Transaction/' + accountNo)
            .then(response => {
                const accounts = response.data;
                if (accounts) {
                    setTransactions(accounts);
                    showNotification('success', 'Here are the recent Transactions in your Account');
                } else {
                    showNotification('error', 'Please enter Valid Account Number');
                }
            })
            .catch(error => {
                showNotification('error', 'Oops :(, Some error occured try again after some time');
            });
    }, [])
    


    return (
        <>
            <div className='mini-container'>
                <div className='miniHeader'> <h2>Mini Account Statement</h2></div>
                <div className="col-sm-6 table-responsive mini-statement-container" style={{width:"1000px"}}>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th class="column-size">Transaction ID</th>
                                <th class="column-size">Date</th>
                                <th class="column-size1" >Transaction Type</th>
                                <th class="column-size1">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{transaction.id}</td>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.transactionType}</td>
                                    <td>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(transaction.transactionAmount)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="back-button">
                    <button className="btn btn-dark" onClick={handleClick}>Close</button>
                </div>
            </div>
        </>
    )
}

export default MiniStatement;
