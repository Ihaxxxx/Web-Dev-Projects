const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/LoginSignup")

const userSchema = mongoose.Schema({
    email : String,
    name  : String,
    password : String,
})

module.exports = mongoose.model('user',userSchema)

