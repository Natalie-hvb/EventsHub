import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

function Main() {
    return (
        <div>
            <div className='banner'>
                <h1 className='slogan'>WHERE PEOPLE MEET</h1>
                <div className='bannerButtons'>
                <Link to="/events" className='bannerButton'>
                    Best Events
                </Link>
                </div>
            </div>
        </div>
    );
}

export default Main;
