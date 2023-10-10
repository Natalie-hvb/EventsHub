import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Events.css"

const Events = () =>{
    const [events, setEvents] = useState([]);

    useEffect(() =>{
        document.title = 'Events';
        axios.get('http://localhost:7000/events')
            .then((response) =>{
                console.log('Response Data:', response.data);
                setEvents(response.data);
            })
            .catch((error) =>{
                console.error('Error fetching event data:', error);
            });
    }, []);

    return (
        <div className="eventsPage">
            <div className="event-listings">
                <ul className="eventList">
                    {events.map((event) =>(
                        <li className="event-item" key={event._id}>
                            <img src={`http://localhost:7000/${event.image}`} alt={event.topic} className="event-image" />
                            <div className="event-details">
                                <a href={`/events/${event._id}`}>{event.topic}</a>
                                <p>Date: {event.date}</p>
                                <p>Location: {event.location}</p>
                                <p>Category: {event.category}</p>
                                <p>Minimum Age: {event.minAge}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <a href="/events/add" className="add-event-button">Add Event</a>
            </div>
        </div>
    );
};

export default Events;