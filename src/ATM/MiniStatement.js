import React from 'react';
import './MiniStatement.css'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MiniStatement = () => {

    const [accountNo, setAccountNo] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();


    const handleClick = () => {
        navigate("/landing", { state: accountNo });
    }

    useEffect(() => {
        var accNo = location.state;
        // alert(accNo)
        setAccountNo(accNo);
    }, [])

    axios.get('http://localhost:5058/Transaction/' + accountNo)
        .then(response => {
            const accounts = response.data;
            console.log(accounts)
            if (accounts.length > 0) {
                setTransactions(accounts);
            } else {
                // show an error message
                // alert("Invalid account number: " + accountNo);
            }
        })
        .catch(error => {
            alert(error)
            console.log(error);
        });
    

    return (
        <>
            <div className='mini-container'>
                <header> <h2>MiniStatements</h2></header>
                <header> <h3>Account Number: {accountNo}</h3></header>
                <div className="col-sm-6 table-responsive mini-statement-container">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.transactionType}</td>
                                    <td>{transaction.transactionAmount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="back-button">
                    <button className="btn btn-dark" onClick={handleClick}>Back</button>
                </div>
            </div>
        </>
    )
}

export default MiniStatement;
