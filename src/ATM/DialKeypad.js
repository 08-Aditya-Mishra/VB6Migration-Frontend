import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import './DialKeypad.css'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const DialKeypad = () => {
    const [accountNo, setAccountNo] = useState(0);
    const navigate = useNavigate();

    function handleClick(e) {

        setAccountNo(Number(accountNo + e.target.innerHTML));
    }

    const handleCancel = () => {
        navigate('/',{state: 0});
    }

    const handleClear = () => {
        setAccountNo('');
    }

    const handleBackspace = () => {
        setAccountNo(Math.floor(accountNo / 10));
    }

    const handleEnter = () => {
        axios.get('http://localhost:5058/api/Account/' + accountNo)
            .then(response => {
                const accounts = response.data;
                console.log(accounts)
                if (accounts.length > 0) {
                    // localStorage.setItem('accountNo', accountNo);
                    navigate('/landing',{state: accountNo});
                    // window.location.href = '/balance'
                } else {
                    // show an error message
                    alert("Invalid account number: " + accountNo);
                }
            })
            .catch(error => {
                console.log(error);
                alert("An error occurred. Please try again later.");
            });
    }

    return (
        <div className='keypad-body'>
            <header>
                <h3>Enter you Account Number</h3>
            </header>
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

    );
}

export default DialKeypad;
