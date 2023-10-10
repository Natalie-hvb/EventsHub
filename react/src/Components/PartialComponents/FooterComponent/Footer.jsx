import React from 'react';
import './Footer.css';

const Footer = () =>{
    return (
        <footer className="bg-black text-white" style={{ borderRadius: '10px' }}>
            <section className="p-1 border-bottom"></section>

            <section>
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                <i className="fas fa-gem me-3"></i>EventsHub
                            </h6>
                            <p>
                                Here you can find more information about us.
                            </p>
                        </div>

                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Useful links
                            </h6>
                            <p>
                                <a href="#!" className="text-reset">Settings</a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">Help</a>
                            </p>
                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                            <p><i className="fas fa-home me-3"></i> Netherlands</p>
                            <p>
                                <i className="fas fa-envelope me-3"></i>
                                events@hub.com
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.09)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            © 2023 Copyright:
                            <a className="text-reset fw-bold ms-1" href="/contact">Developers EventsHub</a>
                        </div>
                        <div className="col-md-6 text-md-end">
                            <i className="fab fa-facebook-f me-4"></i>
                            <i className="fab fa-twitter me-4"></i>
                            <i className="fab fa-linkedin-in me-4"></i>
                            <i className="fab fa-instagram"></i>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
