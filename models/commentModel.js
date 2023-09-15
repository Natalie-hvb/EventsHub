const mongoose = require('mongoose');
const moment = require('moment')
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    post_id: {
        type: mongoose.Types.ObjectId,
        ref: 'post'
    },
    comment: {
        type: String,
        required: true
    },
    user_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    created_at: {
        type: Date,
        default: Date.now,
        get: function (createdAt) {
            return moment(createdAt).format('DD.MM.YYYY HH:mm');
        }
    },
},{timestamps: true});

module.exports = mongoose.model('comment', commentSchema);
