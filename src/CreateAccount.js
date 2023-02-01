import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import './CreateAccount.css'
import NotificationManager from 'react-notifications/lib/NotificationManager';

const CreateAccount = () => {
    const [data, setData] = useState({
        accountName: "",
        amount: "",
        address: "",
        phoneNo: "",
        passport: "",
        accountType: "",
        fingerprintID: "",
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
        axios.post('https://localhost:7286/api/Account', data, config)
            .then(response => {
                showNotification('success', 'Congratulations, your account is created successfully');
                setData({
                    accountName: "",
                    amount: "",
                    address: "",
                    phoneNo: "",
                    passport: "",
                    accountType: "",
                    fingerprintID: "",
                })

            })
            .catch(error => {
                showNotification('error', 'Failed to create account: ' + error.message);
            });
    }

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className='create-acc-bg' style={{overflowY: 'scroll', maxHeight: '550px'}}>
                <div className='mt-5 container'>
                    <form onSubmit={handleSubmit} className="form-group mx-auto" style={{ backgroundColor: '#34568B', width: "600px", margin: "50px", padding: "30px" }}>
                        <h2 className="mb-3 text-white"><center>Add New Account</center></h2>
                        <br></br>

                        <div class="form-group row">
                        <div class="col">
                        <label for="accountName" class="text-white">Account Name:</label>
                        </div>
                        <div class="col-9">
                            <input onChange={(e) => handle(e)} value={data.accountName} type="text" class="form-control mb-3" id="accountName" placeholder="Full Name" required />
                        </div>
                        </div>

                        <div class="form-group row">
                        <div class="col">
                            <label for="amount" class="text-white">Amount:</label>
                        </div>
                            <div class="col-9">
                                <input onChange={(e) => handle(e)} value={data.amount} type="number" class="form-control mb-3" id="amount" placeholder="Amount in ₹" required />
                            </div>
                        </div>

                        <div class="form-group row">
                        <div class="col">
                            <label for="address" class="text-white">Address:</label>
                            </div>
                            <div class="col-9">
                                <input onChange={(e) => handle(e)} value={data.address} type="text" class="form-control mb-3" id="address" placeholder="Address" required />
                            </div>
                        </div>
                        <div class="form-group row">
                        <div class="col">
                            <label for="phoneNo" class="text-white">Phone Number:</label>
                            </div>
                            <div class="col-9">
                                <input onChange={(e) => handle(e)} value={data.phoneNo} type="tel" class="form-control mb-3" id="phoneNo" placeholder="+91-(000)-(000)-(0000)" required />
                            </div>
                        </div>
                        <div class="form-group row">
                        <div class="col">
                            <label for="passport" class="text-white">Passport:</label>
                            </div>
                            <div class="col-9">
                                <input onChange={(e) => handle(e)} value={data.passport} type="text" class="form-control mb-3" id="passport" placeholder="Passport Number" required />
                            </div>
                        </div>
                        <div class="form-group row">
                        <div class="col">
                            <label for="accountType" class="text-white">Account Type:</label>
                            </div>
                            <div class="col-9">
                                <select onChange={(e) => handle(e)} class="form-control mb-3" id="accountType" required defaultValue={data.accountType}>
                                    <option value="" disabled>Select Account Type</option>
                                    <option value="Savings">Savings</option>
                                    <option value="Current">Current</option>
                                </select>

                            </div>
                        </div>
                        <div class="form-group row">
                        <div class="col">
                            <label for="fingerprintID" class="text-white">Fingerprint ID:</label>
                            </div>
                            <div class="col-9">
                                <input onChange={(e) => handle(e)} value={data.fingerprintID} type="text" class="form-control mb-3" id="fingerprintID" placeholder="Fingerprint ID" required />
                            </div>
                        </div>
                        {/* <div class="form-group row">
                            <label for="sms" class="col-sm-2 col-form-label">SMS</label>
                            <div class="col-sm-10">
                                <input onChange={(e) => handle(e)} value={data.sms} type="text" class="form-control mb-3" id="sms" placeholder="Enter SMS" required />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="smsPort" class="col-sm-2 col-form-label">SMS Port</label>
                            <div class="col-sm-10">
                                <input onChange={(e) => handle(e)} value={data.smsPort} type="text" class="form-control mb-3" id="smsPort" placeholder="Enter SMS Port" required />
                            </div>
                        </div> */}
                        <br></br>
                        <div class="d-flex justify-content-center"><center>
                            <button type="submit" class="btn btn-dark mx-auto">Register</button>
                        
                        <Link to="/navbar">
                        <button class="btn btn-dark m-4">Cancel</button>
                    </Link></center>
                    </div>
                    </form>
                </div>
            </div>
        </>
    );
}


export default CreateAccount;
