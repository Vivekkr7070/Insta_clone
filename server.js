const http = require("http");
const initSocket = require("./config/socket");
const cors = require("cors");
const app = require("./app"); // Import the `app` instance from `app.js`
const jwt = require("jsonwebtoken");
const Message = require("./models/Message");
const User = require("./models/User");
const helmet = require('helmet');
require("dotenv").config();
const rateLimit=require('express-rate-limit')

const PORT = process.env.PORT || 6000;
const onlineUsers = {}; // Track online users by username
const offlineMessages = {}; // Track offline messages

app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 100 requests per windowMs
    message: 'Too many login attempts from this IP, please try again after 15 minutes'
});
app.use(limiter);


// Create an HTTP server with the `app` instance
const server = http.createServer(app);

// Initialize Socket.IO on the server
const io = initSocket(server);

// Middleware for socket authentication
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error("Authentication error: Missing token"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new Error("Authentication error: Invalid token"));
        }

        if (!decoded.username) {
            return next(new Error("Authentication error: Username missing in token"));
        }

        socket.username = decoded.username;
        onlineUsers[decoded.username] = socket.id; // Track user by username
        next();
    });
});

// Socket events
io.on('connection', (socket) => {
    console.log(`${socket.username} connected`);

    // Deliver offline messages
    if (offlineMessages[socket.username]) {
        offlineMessages[socket.username].forEach((msg) => {
            socket.emit('receive_message', msg);
        });
        delete offlineMessages[socket.username];
    }

    // Handle private messages
    socket.on('private_message', ({ to, message }) => {
        console.log(`Message from ${socket.username} to ${to}:`, message);

        const msgData = {
            from: socket.username,
            message,
            timestamp: new Date(),
        };

        const toSocketId = onlineUsers[to];
        if (toSocketId) {
            socket.to(toSocketId).emit('receive_message', msgData);
        } else {
            if (!offlineMessages[to]) offlineMessages[to] = [];
            offlineMessages[to].push(msgData);
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`${socket.username} disconnected`);
        delete onlineUsers[socket.username];
    });
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});