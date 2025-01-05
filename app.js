const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

require('dotenv').config();
connectDB();

const app = express();

//middleware
app.use(cors({
    origin: '*', // Update with your frontend URL
    methods: ['GET', 'POST'],
    // allowedHeaders: ['Content-Type', 'Authorization']
})); 
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/posts', require('./routes/commentRoutes'));
app.use('/api/users', require('./routes/userRoutes')); 
app.use('/api/notifications', require('./routes/notificationRoutes'));  // Separate notifications route if needed
app.use('/api/messages', require('./routes/messageRoutes'));  // Add the message routes here

// Error handling middleware
app.use(errorHandler);

module.exports = app;