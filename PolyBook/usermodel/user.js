var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const userScheme = Schema({
    username:String,
    age : Number,
    email:String,
    password : String,
    profileImage : String,
    posts:[
        {type:mongoose.Schema.Types.ObjectId,ref:'post'}  
    ],
    friends:[
        {type:mongoose.Schema.Types.ObjectId,ref:'post'}  
    ],
    pendingRequest:[
        {type:mongoose.Schema.Types.ObjectId,ref:'post'}  
    ],
    receivedRequest:[
        {type:mongoose.Schema.Types.ObjectId,ref:'post'}  
    ]
})

module.exports = mongoose.model('user',userScheme)

