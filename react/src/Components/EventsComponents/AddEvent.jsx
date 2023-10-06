import React, { useState, useEffect } from 'react';
import "./AddEvent.css";
import axios from "axios";

const AddEvent = ({ userId }) => {
    useEffect(() => {
        document.title = 'Add Event';
    }, []);

    const [formData, setFormData] = useState({
        topic: '',
        description: '',
        location: 'Amsterdam',
        date: '',
        image: null,
        minAge: 0,
        category: 'Concert',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('topic', formData.topic);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('location', formData.location);
            formDataToSend.append('date', formData.date);
            formDataToSend.append('image', formData.image);
            formDataToSend.append('minAge', formData.minAge);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('user', userId);
        
            // Make a POST request to your backend API
            const response = await axios.post(`http://localhost:7000/events/add`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for handling files
                },
            });
        
            // Handle success, e.g., show a success message, redirect, etc.
            console.log('Event added successfully:', response.data);
        
            // Clear the form after submission if needed
            setFormData({
                topic: '',
                description: '',
                location: 'Amsterdam',
                date: '',
                image: null,
                minAge: 0,
                category: 'Concert',
            });
            } catch (error) {
                // Handle errors, e.g., show an error message
                console.error('Error adding event:', error);
            }
        };



    return (
        <div className="addEventPage">
            <div className="add-event-container">
                <h1>Add Event</h1>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                >
                    <div className="form-group">
                        <label htmlFor="topic">Event Topic</label>
                        <input
                            type="text"
                            id="topic"
                            name="topic"
                            value={formData.topic}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <select
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="Amsterdam">Amsterdam</option>
                            <option value="Rotterdam">Rotterdam</option>
                            <option value="Utrecht">Utrecht</option>
                            <option value="The Hague">The Hague</option>
                            <option value="Eindhoven">Eindhoven</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Event Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Event Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="minAge">Minimum Age Limit</label>
                        <input
                            type="number"
                            id="minAge"
                            name="minAge"
                            value={formData.minAge}
                            onChange={handleInputChange}
                            min="0"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                        >
                            <option value="Concert">Concert</option>
                            <option value="Art Exhibition">Art Exhibition</option>
                            <option value="Party">Party</option>
                        </select>
                    </div>
                    <button type="submit">Add Event</button>
                </form>
            </div>
        </div>
    );
};

export default AddEvent;
