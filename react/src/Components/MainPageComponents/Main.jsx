import React, {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import axios from "axios";

axios.defaults.withCredentials = true;

function Main() {
    // console.log(user)
    const [user, setUser] = useState(null);
    // Check if the user is already logged in 
    useEffect(() => {
        document.title = 'Home';
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
        setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div>
            <div className='d-flex flex-column page'>
                <h1 className='slogan'>WHERE PEOPLE MEET</h1>
                <div id="carouselExampleCaptions" className="carousel slide">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <a href="http://localhost:3000/events/651efd406520dc8b162e6644" target='_blank'>
                                <img src="./img/dummy1.jpg" className="d-block w-100" alt="d1" />
                            </a>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Natalie's Birthday Party</h5>
                                <p>We are celebrating Natalie's birthday.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <a href="http://localhost:3000/events/651efd406520dc8b162e6645" target='_blank'>
                                <img src="./img/dummy2.jpg" className="d-block w-100" alt="d2" />
                            </a>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Art Exhibition: Modern Masters</h5>
                                <p>Explore the works of modern art masters.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <a href="http://localhost:3000/events/651efd406520dc8b162e6646" target='_blank'>
                                <img src="./img/dummy3.jpg" className="d-block w-100" alt="d3" />
                            </a>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Rock the City: Live Concert</h5>
                                <p>Experience a high-energy rock concert.</p>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Main;
