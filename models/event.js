const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
});

eventSchema.index({ title: 'text' }); // Enable text search on the 'title' field

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
