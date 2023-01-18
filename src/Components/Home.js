import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div className='homeButton-container'>
            <button className='homeButton1'>ATM</button>
            <Link to="/login">
                <button className='homeButton2'>Bank</button>
            </Link>
        </div>
    );
}
export default Home