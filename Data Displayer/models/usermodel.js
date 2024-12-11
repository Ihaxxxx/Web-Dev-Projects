const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/datadisplayer")

const userSchema = mongoose.Schema({
    imageurl : String,
    email : String,
    name  : String
})

module.exports = mongoose.model('user',userSchema)


