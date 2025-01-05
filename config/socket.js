const { Server } = require("socket.io");

const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*', // Adjust according to your needs
            methods: ['GET', 'POST']
        }
    });

    return io; // Return `io` to use it in `server.js`
};

module.exports = initSocket;