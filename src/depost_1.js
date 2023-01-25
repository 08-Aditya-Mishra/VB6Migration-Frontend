import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './deposit.css'
import { Link } from 'react-router-dom';
import NotificationManager from 'react-notifications/lib/NotificationManager';

const Deposit = () => {
    const [data, setData] = useState({
        accountNo: "",
        transactionAmount: "",
    })

    let config = {
        headers: {
            Authorization: `bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
        }

    }

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

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:5178/Transaction/deposit', data,config)
            .then(response => {
                showNotification('success', "Amount of ₹" + data.transactionAmount + " has been successfully deposited into account number " + data.accountNo + ".");
                setData({
                    accountNo: "",
                    transactionAmount: "",
                })
            })
            .catch(error => {
                showNotification('error', "Transaction of ₹" + data.transactionAmount + " to account number " + data.accountNo + " has failed. Please check your account details and try again.");
            })
        console.log(data)
    }

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className='deposit-bg'>
                <form onSubmit={handleSubmit} className="mt-5 container col-sm-4 p-5 " style={{ backgroundColor: '#FFFFFF', marginTop: "100px", border: "1px solid black" }}>
                    <h2 className="mb-3">Deposit Amount</h2>
                    <div class="mb-3">
                        <label for="accountNo" class="form-label">Account Number</label>
                        <input onChange={(e) => handle(e)} value={data.accountNo} type="number" class="form-control" id="accountNo" placeholder="Enter Account No" required />

                    </div>
                    <div class="mb-3">
                        <label for="TransactionAmount" class="form-label">Transaction Amount</label>
                        <input onChange={(e) => handle(e)} value={data.transactionAmount} type="number" class="form-control" id="transactionAmount" placeholder="Enter transaction Amount" required />
                    </div>
                    <button type="submit" class="btn btn-light ">Deposit</button>
                    <Link to="/navbar">
                        <button class="btn btn-dark m-4">Cancel</button>
                    </Link>
                </form>
            </div>
        </>
    )

}
export default Deposit