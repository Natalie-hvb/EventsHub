import React, {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

function Main() {
    // console.log(user)
    const [user, setUser] = useState(null);
    // Check if the user is already logged in 
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
        setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div>
            <div className='banner'>
                <h1 className='slogan'>WHERE PEOPLE MEET</h1>
                <div className='bannerButtons'>
                    {!user ? (
                        <>
                        <Link to="/signup" className='bannerButton signUp'>
                            Sign Up
                        </Link>
                        <Link to="/login" className='bannerButton login'>
                            Login
                        </Link>
                        </>
                    ) : (
                        <Link to="/profile" className='bannerButton'>
                        Profile
                        </Link>
                    )}
                <Link to="/events" className='bannerButton'>
                    Top Events
                </Link>
                </div>
            </div>
        </div>
    );
}

export default Main;
