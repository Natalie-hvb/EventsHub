const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const postSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    message : {
        type: String,
        required: true,
    },
    comments:[
        {
        type: mongoose.Types.ObjectId,
        ref: "comment"
        }
    ],
    user_id:{
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    created_at: {
        type: Date,
        default: Date.now,
        get: function (createdAt) {
            return moment(createdAt).format('DD.MM.YYYY HH:mm');
        }
    },

},{ timestamps: true});


module.exports = mongoose.model('post', postSchema);