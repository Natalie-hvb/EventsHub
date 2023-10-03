import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthComponents/AuthContext';
import './Main.css';

function Main() {
  const { user } = useContext(AuthContext); // Access user state from AuthContext

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
