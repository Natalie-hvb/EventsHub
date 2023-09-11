const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    businessName: {
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
    }
});

businessSchema.index({ businessName: 'text' }); // Enable text search on the 'name' field

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
