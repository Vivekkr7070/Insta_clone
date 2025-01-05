const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Create a new comment
exports.createComment = async (req, res) => {
    try {
        const { postId, text } = req.body;

        // Validate the input
        if (!text) {
            return res.status(400).json({ message: 'Comment text is required' });
        }

        // Verify the post exists before creating a comment
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Create and save the comment
        const comment = new Comment({
            text, // Now using `text` instead of `content`
            user: req.user._id,
            post: postId
        });
        await comment.save();

        res.status(201).json({ message: 'Comment created successfully', comment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create comment', error: error.message });
    }
};


// Get comments for a specific post
exports.getComments = async (req, res) => {
    try {
        const { postId } = req.params;

        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Retrieve and populate comments for the post
        const comments = await Comment.find({ post: postId })
            .populate('user', 'username')
            .sort({ createdAt: -1 });
        res.status(200).json({ message: 'Comments retrieved successfully', comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve comments', error: error.message });
    }
};