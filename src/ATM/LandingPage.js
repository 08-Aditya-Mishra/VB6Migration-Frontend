import React from 'react';
import image from "./landing_page.png";
import './LandingPage.css';
import { useLocation,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';

const LandingPage = () => {

    const navigate = useNavigate();

    const [accountNo, setAccountNo] = useState(0);
    const location = useLocation();
    
    useEffect(() => {
        var accNo = location.state
        setAccountNo(accNo);
    },[location])
    
    const handleClickWithdraw = () =>{
        navigate('/withdraw',{state: accountNo});
    }

    const handleClickBalance = () => {
        navigate('/balance',{state: accountNo});
    }
    const handleClickStatement = () => {
        navigate('/statements',{state: accountNo});
    }

    const handleCancel = () => {
        navigate('/keypad',{state: 0});
    }

    return (
        <div>
            < div className="landingContainer">
                <button onClick={handleClickWithdraw} className="btn btn-dark m-1">Withdraw</button>
                <button onClick={handleClickBalance} className="btn btn-dark m-1">Balance Enquiry</button>
                <button className="btn btn-dark m-1">MTN top up</button>
                <button onClick={handleClickStatement} className="btn btn-dark m-1">Mini Statement</button>
                <button onClick={handleCancel} className="btn btn-dark m-1">Cancel</button>

            </div>
        </div>
    )
}

export default LandingPage;