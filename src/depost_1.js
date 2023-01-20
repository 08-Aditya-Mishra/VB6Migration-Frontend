import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Deposit = () => {
    const [data, setData] = useState({
        accountNo: "",
        transactionAmount: "",
    })
    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:5058/Transaction/deposit', data)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        console.log(data)
    }

    return (
        <>
            <Navbar />
            <form onSubmit={handleSubmit} className="mt-5 container col-sm-4 p-5 " style={{ marginTop: "100px", border: "1px solid black" }}>
                <h2 className="mb-3">Account Deposit</h2>
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
        </>
    )

}
export default Deposit