const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const postSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true 
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user' 
        }
    ]
});

module.exports = mongoose.model('post', postSchema);
