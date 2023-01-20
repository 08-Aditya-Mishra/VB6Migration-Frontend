import React, { useState } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import './withdraw.css';
import { useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

const Withdraw = () => {

    const [transactionAmount, setAmount] = useState(0);
    const [accountNo, setAccountNo] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    
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

    const handleBackspace = () =>{
        setAmount(Math.floor(transactionAmount / 10))
    }

    const handleEnter = () => {
        axios.post('http://localhost:5058/Transaction/withdraw', { accountNo: accountNo, transactionAmount: transactionAmount })

            .then(response => {
                const accounts = response.data;
                if (accounts) {
                    // navigate to the next page
                    // history.push("/next-page");
                    alert("Account Number Verified: "+accountNo+" and Amount: Rs."+transactionAmount+" was withdrawn");
                } else {
                    // show an error message
                    alert("Invalid account number: ");
                }
            })
            .catch(error => {
                alert("acc no: " + accountNo);
                console.log(error);
                alert("An error occurred. Please try again later.");
            });
    }

    return (
        <div className='withdraw-body'>
            <header>
                <h3>Enter Withdrawal Amount</h3>
            </header>
            <div className="keypad-container">
                <div className="output">
                    <input type="text" value={transactionAmount} disabled />
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
    );
}

export default Withdraw;
