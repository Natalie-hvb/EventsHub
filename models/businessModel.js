// models/businessModel.js

const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    size: {
        type: String,
        enum: ['Small', 'Medium', 'Big'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String, // Store the file path or URL to the uploaded image
    },
    category: {
        type: String,
        enum: ['Cafe', 'Art Gallery', 'Club', 'Restaurant', 'Other'], // Add more categories as needed
    }
    // Add more fields as needed
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
