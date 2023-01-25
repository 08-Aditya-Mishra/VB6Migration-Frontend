import React from 'react'
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import NotificationManager from 'react-notifications/lib/NotificationManager';
import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import './FingerPrint.css';


const FingerPrint = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [inputValue, setInputValue] = useState('');
    const [accountNo, setAccountNo] = useState(0);
    const [maskedValue, setMaskedValue] = useState('');

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
        var accNo = location.state
        setAccountNo(accNo);
    }, [accountNo])

    function handleChange(e) {
        setInputValue(e.target.value);
      }

    const handleEnter = () => {
        axios.get('http://localhost:5178/api/Account/' + accountNo)
            .then(response => {
                console.log(maskedValue)
                console.log(inputValue)
                var account = response.data
                console.log(account.length)
                if (account.length > 0) {
                    const inputText = inputValue;
                    const inputHash = CryptoJS.SHA256(inputText).toString();
                    console.log(inputHash);
                    console.log(account[0]);
                    if (inputHash == account[0].fingerprintID) {
                        navigate('/landing', { state: accountNo });
                        showNotification('success', 'Congratulations, FingerprintID is Verified');
                        setInputValue('');
                        setMaskedValue('');
                    }
                    else {
                        showNotification('error', 'Please, Enter Valid FingerprintID!');
                    }
                } else {
                    alert("err");
                    // show an error message
                    showNotification('error', 'Please, Enter Valid FingerprintID!');
                }
            })
            .catch(error => {
                console.log(error);
                showNotification('error', 'An error occurred. Please try again later.');
            });
    }

    return (
        <>
            <div className='center-div'>
                <div className='fingerprint-header'>Enter Fingerprint ID here</div>
                <div>
                    <input type="password" value={inputValue} onChange={e => handleChange(e)} className="input-styles" />
                </div>
                <div>
                    <button onClick={handleEnter} className="btn btn-dark button-styles">Submit</button>
                </div>
            </div>

        </>
    );
}

export default FingerPrint
