const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['like', 'comment', 'follow'], required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    relatedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
