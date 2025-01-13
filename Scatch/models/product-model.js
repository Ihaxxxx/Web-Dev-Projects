var mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image: Buffer,
    name: String,
    price:Number,
    dicount:{
        type : Number,
        default : 0 ,
    },
    bgcolor : String,
    panelcolor : String,
    textcolor : String,
});

module.exports = mongoose.model("product",productSchema)