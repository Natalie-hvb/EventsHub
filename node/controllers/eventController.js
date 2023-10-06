const Event = require('../models/eventModel');
const moment = require('moment');

exports.getEventsPage = async (req, res) => {
    try {
        // Fetch all events from the database and send them as JSON
        const events = await Event.find().populate('user');
        const formattedEvents = events.map((event) => {
            return {
                ...event.toObject(),
                date: moment(event.date).format('DD.MM.YYYY HH:mm'), // Format the date field
            };
        });
        res.json(formattedEvents);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.addEvent = async (req, res) => {
    console.log(req.body);
    try {
        /* // Check if res.locals.user is defined
        if (!req.params.user || !req.params.user._id) {
            console.error('User data not found.');
            res.status(500).send('User data not found.');
            return;
        } */

        // Create a new event and save it to the database
        const newEvent = new Event({
            topic: req.body.topic,
            description: req.body.description,
            location: req.body.location,
            date: req.body.date,
            image: req.body.image,
            minAge: req.body.minAge,
            category: req.body.category,
            // Set the 'user' field to the user ID of the currently logged-in user
            user: res.locals.userId // Assuming you have user information in res.locals.user
        });

        // Save the new event to the database
        await newEvent.save();

        // Respond with JSON indicating the successful addition of the event
        res.status(201).json({ message: 'Event added successfully', Event: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getEventDetails = async (req, res) => {
    try {
        const eventId = req.params.id;

        // Use the findById method to find the event by its ID and populate the 'user' field
        const event = await Event.findById(eventId).populate('user');

        if (!event) {
            // Handle the case where the event is not found
            return res.status(404).send('Event not found');
        }

        // Format the event date
        const formattedEvent = {
            ...event.toObject(),
            date: moment(event.date).format('DD.MM.YYYY HH:mm'), // Format the date field
        };

        // Send the formatted event as JSON
        res.json(formattedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
