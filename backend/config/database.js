const mongoose = require('mongoose');

const connectDB = async () => {
    console.log(process.env.MONGO_URI)
    const mongoURI = process.env.MONGO_URI;
    const port = process.env.PORT || 3002;

    try {
        await mongoose.connect(mongoURI);
        console.log('✓ Connected to MongoDB...');
        return { success: true, port };
    } catch (err) {
        console.error('✗ Could not connect to MongoDB...', err.message);
        console.warn('⚠ Warning: Server starting without database connection. API will fail until MongoDB is available.');
        // Allow server to start even if MongoDB is temporarily unavailable
        return { success: true, port };
    }
};

module.exports = connectDB;module.exports = connectDB;
