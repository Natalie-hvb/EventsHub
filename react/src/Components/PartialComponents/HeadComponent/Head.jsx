import React, { useEffect, useState } from 'react';
import "./Head.css";

function App() {
    const [user, setUser] = useState(null);

  // Fetch user data using useEffect
    useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(data => {
        // Assuming you want to set the user data in the state
        setUser(data);
        });
    }, []);

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
                            <React.Fragment>
                                {/* <form action="/search" method="GET">
                                <input type="text" name="q" placeholder="Search..." />
                                <button type="submit" id="searchbar">Search</button>
                                </form> */}
                                <li className="nav-item">
                                    Welcome, {user.name}
                                </li>
                                <li className="nav-item">
                                    <a className="btn btn-outline-light" href="/logout">Sign out</a>
                                </li>
                                <li className="nav-item">
                                    <a href={`/profile/${user._id}`} className="nav-link">
                                        <img src={user.profileImageUrl || '/img/profile.png'} alt="Profile Logo" id="profile-pic" className="rounded-circle" width="40" height="40" />
                                    </a>
                                </li>
                            </React.Fragment>
                        ) : (
                        <React.Fragment>
                            <li className="nav-item ml-2">
                                <a className="btn btn-outline-light" href="/login">Log in</a>
                            </li>
                            <li className="nav-item ml-2">
                                <a className="btn btn-primary" href="/signup">Sign up</a>
                            </li>
                        </React.Fragment>
                        )}
                    </ul>
                </div>
            </nav>

            {/* Your content goes here */}
        </div>
    );
}

export default App;
