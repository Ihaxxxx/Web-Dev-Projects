const { name } = require('ejs');
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/SocialMediaApp")

var Schema = mongoose.Schema;

const userScheme = Schema({
    username : String,
    name:String,
    age : Number,
    email:String,
    password : String,
    profilepic:{
        type:String,
        default:"defaultPic.jpeg"
    },
    posts:[
        {type:mongoose.Schema.Types.ObjectId,ref:'post'}  
    ]
})

module.exports = mongoose.model('user',userScheme)

