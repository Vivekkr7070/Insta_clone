// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//     sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     content: { type: String, required: true },
//     fileUrl: { type: String },  // URL of any file shared in the message
//     isRead: { type: Boolean, default: false },
//     timestamp: { type: Date, default: Date.now }
// });

// messageSchema.index({ sender: 1, receiver: 1, timestamp: -1 });

// module.exports = mongoose.model('Message', messageSchema);

// Mongoose model for messages

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;