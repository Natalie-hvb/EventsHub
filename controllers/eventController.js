const Event = require('../models/eventModel');

exports.getEventsPage = async (req, res) => {
    try {
        // Fetch all events from the database and populate the 'user' field to get user information
        const events = await Event.find().populate('user');

        // Render the events page with the list of events
        res.render('events', { events, title: "Events" });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.filterEvents = async (req, res) => {
    try {
        // Implement your filtering logic here based on req.body
        // For example, you can use Event.find() with filters and populate('user')

        // Fetch filtered events from the database and populate the 'user' field
        const filteredEvents = await Event.find(/* your filtering criteria */).populate('user');

        // Render the events page with filtered results
        res.render('events', { events: filteredEvents, title: "Filtered Events" });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getAddEventForm = (req, res) => {
    // Render the "Add Event" form
    res.render('addEvent', { title: "Add Event" });
};

exports.addEvent = async (req, res) => {
    try {
        // Check if res.locals.user is defined
        if (!res.locals.user) {
            console.error('User data not found.');
            res.status(500).send('User data not found.');
            return;
        }

        // Create a new event and save it to the database
        const newEvent = new Event({
            title: req.body.title,
            date: req.body.date,
            location: req.body.location,
            category: req.body.category,
            // Set the 'user' field to the user ID of the currently logged-in user
            user: res.locals.user._id // Assuming you have user information in res.locals.user
        });

        // Save the new event to the database
        await newEvent.save();

        // Redirect to the event details page for the newly created event
        res.redirect(`/events/${newEvent._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


exports.getEventDetails = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId).populate('user');

        if (!event) {
            // Handle the case where the event is not found
            return res.status(404).send('Event not found');
        }

        // Render the event details page with the retrieved data
        res.render('eventDetails', { event, title: event.title });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
