const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    imageUrl: { type: String },
    tempImage: {
        data: Buffer,
        contentType: String
    }
}, { timestamps: true });

// Virtual field for comments
postSchema.virtual('comments', {
    ref: 'Comment',               // The model to use
    localField: '_id',             // Find comments where `localField`
    foreignField: 'post',          // is equal to `foreignField` in the Comment model
    justOne: false                 // `false` for array of comments
});

// Enable virtuals to be included when the document is serialized to JSON
postSchema.set('toObject', { virtuals: true });
postSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Post', postSchema);