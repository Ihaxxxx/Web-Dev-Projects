const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/SocialMediaApp");

var Schema = mongoose.Schema;

const postSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' // Reference to the 'user' model
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
