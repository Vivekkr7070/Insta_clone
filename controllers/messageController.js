const Message = require('../models/Message');

// Fetch conversation between two users
// exports.getMessages = async (req, res) => {
//     const { userId, otherUserId } = req.params;

//     try {
//         const messages = await Message.find({
//             $or: [
//                 { sender: userId, receiver: otherUserId },
//                 { sender: otherUserId, receiver: userId }
//             ]
//         }).sort({ timestamp: 1 });

//         res.status(200).json(messages);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to load messages", error });
//     }
// };

exports.getMessages = async (req, res) => {
    try {
        const friendId = req.params.friendId;
        console.log(friendId)
        const messages = await Message.find({
            $or: [
                { from: req.userId, to: friendId },
                { from: friendId, to: req.userId }
            ]
        }).sort({ timestamp: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};