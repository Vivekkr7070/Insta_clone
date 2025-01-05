const Message = require('../models/Message');

module.exports = (io, socket) => {
    socket.on("join", (userId) => {
        socket.join(userId);
    });

    socket.on("sendMessage", async ({ senderId, receiverId, content, fileUrl }) => {
        try {
            const message = await new Message({ sender: senderId, receiver: receiverId, content, fileUrl }).save();
            io.to(receiverId).emit("receiveMessage", message);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    });

    socket.on("markAsRead", async (messageId) => {
        try {
            await Message.findByIdAndUpdate(messageId, { isRead: true });
        } catch (error) {
            console.error("Error marking message as read:", error);
        }
    });
};
