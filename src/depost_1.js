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
        axios.post('https://localhost:7286/Transaction/deposit', data,config)
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
            <div className='mt-5 container'>
                <form onSubmit={handleSubmit} className="form-group mx-auto " style={{ backgroundColor: '#34568B', width: "600px", margin: "50px", padding: "30px"}}>
                <h2 className="mb-3 text-white"><center>Account Deposit</center></h2>
                <br></br>

                <div class="form-group row">
                        <div class="col-4">
                        <label for="accountName" class="text-white">Account Number:</label>
                        </div>
                        <div class="col-8">
                        <input onChange={(e) => handle(e)} value={data.accountNo} type="number" class="form-control mb-3" id="accountNo" placeholder="Account Number" required />
                        </div>
                        </div>

                        <div class="form-group row">
                        <div class="col-4">
                        <label for="TransactionAmount" class="text-white">Amount:</label>
                        </div>
                        <div class="col-8">
                        <input onChange={(e) => handle(e)} value={data.transactionAmount} type="number" class="form-control mb-3" id="transactionAmount" placeholder="Amount" required />
                        </div>
                        </div>

                        <br></br>



                        <div class="d-flex justify-content-center"><center>
                            <button type="submit" class="btn btn-dark mx-auto">Deposit</button>
                        
                        <Link to="/navbar">
                        <button class="btn btn-dark m-4">Cancel</button>
                    </Link></center>
                    </div>
                    
                </form>
                </div>
            </div>
        </>
    )

}
export default Deposit
