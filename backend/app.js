require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import configurations and middleware
const connectDB = require('./config/database');
const corsOptions = require('./config/cors');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const usersRoute = require('./routes/users.route');
const itemsRoute = require('./routes/items.route');

const app = express();
const port = process.env.PORT || 3002;

// Database connection
connectDB().then((result) => {
    if (result.success) {
        app.listen(result.port, () => console.log(`Listening on port ${result.port}`));
    } else {
        console.error('Failed to start server:', result.error);
        process.exit(1);
    }
});

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use('/api/users', usersRoute);
app.use('/api/items', itemsRoute);

// Error handling middleware
app.use(errorHandler);

module.exports = app;