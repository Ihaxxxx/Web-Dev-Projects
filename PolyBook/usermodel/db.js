// db.js
const mongoose = require('mongoose');

// A single connection URI for the application
const connectDB = async () => {
  try {
    // Remove deprecated options
    await mongoose.connect('mongodb://localhost:27017/PolyBook');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit the app in case of connection error
  }
};

module.exports = connectDB;
