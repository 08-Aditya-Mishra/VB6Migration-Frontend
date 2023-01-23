import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
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
        sms: "",
        smsPort: ""
    })

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
        axios.post('http://localhost:5178/api/Account', data)
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
                    sms: "",
                    smsPort: ""
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
            <div className='create-acc-bg'>
                <div className='mt-5 container'>
                    <form onSubmit={handleSubmit} className="form-group mx-auto" style={{ backgroundColor: '#FFFFFF', width: "600px", margin: "50px", border: "1px solid black", padding: "30px", overflowY: 'scroll', maxHeight: '500px'}}>
                        <h2 className="mb-3">Create an Account</h2>
                        <div class="form-group row">
                            <label for="accountName" class="col-sm-2 col-form-label">Account Name</label>
                            <div class="col-sm-10">
                                <input onChange={(e) => handle(e)} value={data.accountName} type="text" class="form-control mb-2" id="accountName" placeholder="Enter Account Name" required />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="amount" class="col-sm-2 col-form-label">Amount</label>
                            <div class="col-sm-10">
                                <input onChange={(e) => handle(e)} value={data.amount} type="number" class="form-control mb-3" id="amount" placeholder="Enter Amount" required />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="address" class="col-sm-2 col-form-label">Address</label>
                            <div class="col-sm-10">
                                <input onChange={(e) => handle(e)} value={data.address} type="text" class="form-control mb-3" id="address" placeholder="Enter Address" required />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="phoneNo" class="col-sm-2 col-form-label">Phone Number</label>
                            <div class="col-sm-10">
                                <input onChange={(e) => handle(e)} value={data.phoneNo} type="tel" class="form-control mb-3" id="phoneNo" placeholder="Enter Phone Number" required />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="passport" class="col-sm-2 col-form-label">Passport</label>
                            <div class="col-sm-10">
                                <input onChange={(e) => handle(e)} value={data.passport} type="text" class="form-control mb-3" id="passport" placeholder="Enter Passport" required />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="accountType" class="col-sm-2 col-form-label">Account Type</label>
                            <div class="col-sm-10">
                                <select onChange={(e) => handle(e)} class="form-control mb-3" id="accountType" required defaultValue={data.accountType}>
                                    <option value="" disabled>Select an account type</option>
                                    <option value="Savings">Savings</option>
                                    <option value="Current">Current</option>
                                </select>

                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="fingerprintID" class="col-sm-2 col-form-label">Fingerprint ID</label>
                            <div class="col-sm-10">
                                <input onChange={(e) => handle(e)} value={data.fingerprintID} type="text" class="form-control mb-3" id="fingerprintID" placeholder="Enter Fingerprint ID" required />
                            </div>
                        </div>
                        <div class="form-group row">
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
                        </div>
                        <div class="d-flex justify-content-center">
                            <button type="submit" class="btn btn-dark mx-auto">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}


export default CreateAccount;