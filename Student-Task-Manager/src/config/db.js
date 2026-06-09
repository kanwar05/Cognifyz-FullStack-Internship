const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn('MONGO_URI is not set. Using in-memory fallback data.');
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.warn(`MongoDB connection failed: ${error.message}`);
    console.warn('The app will still run with temporary in-memory data.');
  }
};

module.exports = connectDB;
