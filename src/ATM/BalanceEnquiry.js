import React, { useState } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import './BalanceEnquiry.css'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BalanceEnquiry = () => {
    const [accountName, setAccountName] = useState(null);
    const [amount, setAmount] = useState(null);
    const [accountNo, setAccountNo] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

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

                } else {
                    // show an error message
                    alert("Invalid account number: ");
                }
            })
            .catch(error => {
                console.log(error);
                alert("An error occurred. Please try again later.");
            });
    }, []); 

    return (
        <>
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
                <button onClick={handleClick} className="btn btn-dark">Back</button>
            </div>

        </>
    );
}


export default BalanceEnquiry;
