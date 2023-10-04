import React from 'react';
import "./Head.css";

function Head() {
    const user = null; // Set user to null if not authenticated

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
                <a className="navbar-brand" href="/">
                    <img src="/img/logo.png" alt="EventsHub Logo" id="logo" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/events">Events</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/businesses">Businesses</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/forum">Forum</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/contact">Contacts</a>
                        </li>
                        {user ? (
                            <>
                                <li className="nav-item">
                                    Welcome, {user.name}
                                </li>
                                <li className="nav-item">
                                    <a className="btn btn-outline-light" href="/logout">Sign out</a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item ml-2">
                                    <a className="btn btn-outline-light" href="/login">Log in</a>
                                </li>
                                <li className="nav-item ml-2">
                                    <a className="btn btn-primary" href="/signup">Sign up</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>

            {/* Your content goes here */}
        </div>
    );
}

export default Head;
