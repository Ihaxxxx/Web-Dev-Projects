const mongoose = require('mongoose');
const config = require('config')

const dbgr = require('debug')("development:mongoose");


mongoose.connect(`${config.get("MONGODB_URI")}/scatch`)
    .then(() => dbgr("Connected to MongoDB successfully."))
    .catch((err) => dbgr("Connection error: %O", err));

const db = mongoose.connection;


module.exports = db;
 