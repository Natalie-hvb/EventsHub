const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    location:  {
        type: String,
        required: true
    }
});

// Create a compound text index on 'username', 'name', and 'surname' fields
userSchema.index({ username: 'text', name: 'text', surname: 'text' });

const User = mongoose.model('User', userSchema);

module.exports = User;
