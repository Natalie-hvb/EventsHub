const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postModel = new Schema({
    message : {
        type: String,
        required: true,
        minlength: 25
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user", // Reference to the User model
    },
    comments: {
        type: mongoose.Types.ObjectId,
        ref: "comment"
    },

},{timestamps: true});


module.exports = mongoose.model('post', postModel);