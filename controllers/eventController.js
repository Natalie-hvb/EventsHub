const Event = require('../models/eventModel');

// Define an array of dummy events
const dummyEvents = [
    {
        title: "Natalie's Birthday Party",
        description: "We are celebrating Natalie's birthday",
        location: "Rotterdam",
        date: new Date('2023-10-15'),
        image: "/img/dummy1.jpg",
        minAge: 18,
        category: "Party",
    },
    {
        title: "Art Exhibition: Modern Masters",
        description: "Explore the works of modern art masters",
        location: "Amsterdam",
        date: new Date('2023-11-05'),
        image: "/img/dummy2.jpg",
        minAge: 0,
        category: "Art Exhibition",
    },
    {
        title: "Rock the City: Live Concert",
        description: "Experience a high-energy rock concert",
        location: "Berlin",
        date: new Date('2023-09-20'),
        image: "/img/dummy3.jpg",
        minAge: 16,
        category: "Concert",
    },
    {
        title: "Tech Meetup: Emerging Technologies",
        description: "Join tech enthusiasts and discover the latest in emerging technologies",
        location: "London",
        date: new Date('2023-10-30'),
        image: "/img/dummy4.jpg",
        minAge: 0,
        category: "Other",
    },
    {
        title: "Family Fun Day at the Park",
        description: "A day of family-friendly activities, games, and picnics",
        location: "Paris",
        date: new Date('2023-09-25'),
        image: "/img/dummy5.jpg",
        minAge: 0,
        category: "Other",
    }
    // Add more dummy events as needed
];

exports.getEventsPage = async (req, res) => {
    try {
        // Fetch all events from the database and populate the 'user' field to get user information
        const events = await Event.find().populate('user');

        // Merge the dummy events with the database events
        const allEvents = [...dummyEvents, ...events];

        // Render the events page with the list of events
        res.render('events', { events: allEvents, title: "Events" });
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
    res.render('addEvent', { title: "Add Event"});
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
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            date: req.body.date,
            image: req.body.image,
            minAge: req.body.minAge,
            category: req.body.category,
            // Set the 'user' field to the user ID of the currently logged-in user
            user: req.params.userId // Assuming you have user information in res.locals.user
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
