import React from 'react';
import './LandingPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NotificationManager from 'react-notifications/lib/NotificationManager';

const LandingPage = () => {

    const navigate = useNavigate();

    const [accountNo, setAccountNo] = useState(0);
    const location = useLocation();

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
    }, [location])

    const handleClickWithdraw = () => {
        navigate('/withdraw', { state: accountNo });
    }

    const handleClickBalance = () => {
        navigate('/balance', { state: accountNo }); 
    }

    const handleClickMTN = () => {
        navigate('/transferacc', { state: accountNo });
    }

    const handleClickStatement = () => {
        navigate('/statements', { state: accountNo });     
    }

    const handleCancel = () => {
        navigate('/keypad', { state: 0 });
    }

    return (
        <>
            < div className="landingContainer">
                <div className='buttonPosi'>
                    <button style={{width:"322px",height:"43px"}} onClick={handleClickWithdraw}  className="btn btn-dark m-1 ">Withdraw</button>
                    <button style={{width:"322px",height:"43px"}} onClick={handleClickBalance} className="btn btn-dark m-1">Balance Enquiry</button>
                    <button style={{width:"322px",height:"43px"}} onClick={handleClickMTN}   className="btn btn-dark m-1">Bank Transfer</button>
                    <button style={{width:"322px",height:"43px"}} onClick={handleClickStatement} className="btn btn-dark m-1">Mini Statement</button>
                    <button style={{width:"322px",height:"43px"}} onClick={handleCancel} className="btn btn-dark m-1">Cancel</button>
                </div>
            </div>
        </>
    )
}

export default LandingPage;