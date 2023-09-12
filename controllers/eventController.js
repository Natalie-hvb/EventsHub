const Event = require('../models/event');

// Handle requests for event details by its ID
exports.getEventById = async (req, res) => {
    const eventId = req.params.id;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
        return res.status(404).send('Event not found');
        }

        // Render the event details view with 'event' data
        res.render('eventDetails', { event, title: event.title });
    } 
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
