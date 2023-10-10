import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./EventDetails.css"

const EventDetails = () =>{
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() =>{
        // Fetch event data for the specified ID and set it in state
        axios
        .get(`http://localhost:7000/events/${id}`)
        .then((response) =>{
            setEvent(response.data);
            // Set the document title after data has been fetched
            if (response.data && response.data.topic){
                document.title = response.data.topic;
            }
        })
        .catch((error) =>{
            console.error('Error fetching event data:', error);
        });
    }, [id]);

    if (!event){
        return <div>Loading...</div>; // Show a loading indicator while fetching data
    }

    return (
        <div className="event-details-container">
            <div className="left-panel">
                <img src={`http://localhost:7000/${event.image}`} alt={event.topic} className="event-details-image" />
                <h2 className="event-topic">{event.topic}</h2>
                <p className="event-description">{event.description}</p>
            </div>
            <div className="right-panel">
                <div className="event-info">
                    <div className="info-item">
                        <h2 className="event-topic">{event.topic}</h2>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Location:</span>
                        <span className="info-value">{event.location}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Date:</span>
                        <span className="info-value">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Minimum Age:</span>
                        <span className="info-value">{event.minAge} years</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Category:</span>
                        <span className="info-value">{event.category}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Event Organizer:</span>
                        <span className="info-value">{event.user}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;