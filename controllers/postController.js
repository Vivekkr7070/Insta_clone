const Post = require('../models/Post');
const baseUrl = 'http://localhost:6001'


// exports.createPost = async (req, res) => {
//     try {
//         const { title, content } = req.body;

//         // Validate input fields
//         if (!title || !content) {
//             return res.status(400).json({ message: 'Title and content are required' });
//         }

//         // Create new post with user ID from the request object
//         const post = new Post({ title, content, user: req.user._id});
//         await post.save();

//         res.status(201).json({ message: 'Post created successfully', post });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to create post', error: error.message });
//     }
// };


exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        // Validate input fields
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        // Initialize `imageUrl` if an image was uploaded
        let imageName = req?.file?.filename;
        let imageUrl = null;
        if (req.file) {
            imageUrl = baseUrl + "/public/uploads/" + imageName;
        }

        // Create new post with user ID and imageUrl
        const post = new Post({
            title,
            content,
            user: req.user._id, // Auth middleware adds `user` to req
            imageUrl
        });

        await post.save();

        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create post', error: error.message });
    }
};


exports.getPosts = async (req, res) => {
    try {
        // Retrieve posts, populate necessary fields
        const posts = await Post.find()
            .select('content user likes imageUrl createdAt updatedAt') // Select necessary fields including imageUrl
            .populate('user', 'username email') // Populate user info with username and email
            .populate({
                path: 'comments',                 // Populate comments with commenter info
                populate: { path: 'user', select: 'username' }
            })
            .sort({ createdAt: -1 });
        // Check if no posts found
        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: 'No posts found' });
        }

        // Return posts with imageUrl included
        res.status(200).json({ message: 'Posts retrieved successfully', posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve posts', error: error.message });
    }
};

// exports.getPosts = async (req, res) => {
//     try {
//         const posts = await Post.find()
//             .populate('user', 'username email') // Populate user info with username and email
//             .populate({
//                 path: 'comments',                 // Populate comments with commenter info
//                 populate: { path: 'user', select: 'username' }
//             })
//             .sort({ createdAt: -1 });

//         if (!posts || posts.length === 0) {
//             return res.status(404).json({ message: 'No posts found' });
//         }

//         res.status(200).json({ message: 'Posts retrieved successfully', posts });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to retrieve posts', error: error.message });
//     }
// };
