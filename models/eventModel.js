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
    image: {
        type: String, // Store the file path or URL to the uploaded image
    },
    minAge: {
        type: Number,
    },
    category: {
        type: String,
        enum: ['Concert', 'Art Exhibition', 'Party', 'Other'], // Add more categories as needed
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a 'User' model
        required: true
    }
});

eventSchema.index({ title: 'text' }); // Enable text search on the 'title' field

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
