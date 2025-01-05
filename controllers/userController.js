// const User = require('../models/User');
// const Notification = require('../models/Notification');
// const mongoose = require('mongoose');

// // Follow a user
// exports.followUser = async (req, res) => {
//     try {
//         console.log(req)
//         // const { userId } = req.query;
//         const { userId } = req.params;
//         console.log("🚀 ~ exports.followUser= ~ userId:", userId)

//         // Validate userId and req.user._id
//         if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(req.user._id)) {
//             return res.status(400).json({ message: 'Invalid user ID in request' });
//         }

//         const currentUserId = req.user._id;

//         // Find the target user to follow
//         const targetUser = await User.findById(userId);
//         if (!targetUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Check if the current user is already following the target user
//         if (targetUser.followers.includes(currentUserId)) {
//             return res.status(400).json({ message: 'You are already following this user' });
//         }

//         // Add the current user to the target user's followers list
//         targetUser.followers.push(currentUserId);
//         await targetUser.save();

//         // Add the target user to the current user's following list
//         const currentUser = await User.findById(currentUserId);
//         currentUser.following.push(targetUser._id);
//         await currentUser.save();

//         // Notification for following
//         await new Notification({
//             user: targetUser._id,
//             type: 'follow',
//             message: `${currentUser.username} started following you`,
//             relatedUser: currentUserId,
//         }).save();

//         res.status(200).json({ message: 'Followed successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to follow user', error: error.message });
//     }
// };


// // Unfollow a user
// exports.unfollowUser = async (req, res) => {
//     try {
//         const { userId } = req.params;

//         if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(req.user._id)) {
//             return res.status(400).json({ message: 'Invalid user ID in request' });
//         }
//         const currentUserId = req.user._id;

//         // Find the target user to unfollow
//         const targetUser = await User.findById(currentUserId);
//         if (!targetUser) return res.status(404).json({ message: 'User not found' });

//         // Remove current user from the target user's followers list
//         targetUser.followers = targetUser.followers.filter(
//             follower => !follower.equals(currentUserId)
//         );

//         // Remove target user from the current user's following list
//         const currentUser = await User.findById(currentUserId);
//         currentUser.following = currentUser.following.filter(
//             following => !following.equals(targetUser._id)
//         );

//         await targetUser.save();
//         await currentUser.save();

//         res.status(200).json({ message: 'Unfollowed successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to unfollow user', error: error.message });
//     }
// };


// // Get notifications for a user
// exports.getNotifications = async (req, res) => {
//     try {
//         const notifications = await Notification.find({ user: req.user }).sort({ createdAt: -1 });
//         res.json(notifications);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to retrieve notifications', error });
//     }
// };

// // exports.getNotifications = async (req, res) => {
// //     try {
// //         const { page = 1, limit = 10, unreadOnly = false } = req.query;
// //         const query = { user: req.user._id };

// //         // If unreadOnly is set to true, filter notifications that are unread
// //         if (unreadOnly === 'true') {
// //             query.isRead = false;
// //         }

// //         // Retrieve notifications with pagination and sorting
// //         const notifications = await Notification.find(query)
// //             .sort({ createdAt: -1 })
// //             .limit(parseInt(limit))
// //             .skip((parseInt(page) - 1) * parseInt(limit))
// //             .populate('relatedUser', 'username')  // Populate related user details
// //             .populate('post', 'title')             // Populate post title if related to post

// //         // Get the total count of notifications for pagination meta info
// //         const totalNotifications = await Notification.countDocuments(query);

// //         res.status(200).json({
// //             message: 'Notifications retrieved successfully',
// //             notifications,
// //             pagination: {
// //                 total: totalNotifications,
// //                 page: parseInt(page),
// //                 limit: parseInt(limit),
// //                 totalPages: Math.ceil(totalNotifications / limit)
// //             }
// //         });
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ message: 'Failed to retrieve notifications', error: error.message });
// //     }
// // };

// // const User = require('../models/User'); // Assuming you have a User model



// // Fetch user by ID
// exports.getUserById = async (req, res) => {
//     const { userId } = req.params; // Get userId from the route parameter

//     try {
//         const user = await User.findById(userId).select('-password'); // Fetch user details, exclude password

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json(user);
//     } catch (error) {
//         console.error('Error fetching user:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// // exports.getAllusers = async (req, res) => {
// //     try {
// //         const users = await User.find().select('_id username'); // Fetch only _id and username fields

// //         if (!users || users.length === 0) {
// //             return res.status(404).json({ message: 'Users not found' });
// //         }

// //         res.status(200).json(users);
// //     } catch (error) {
// //         console.error('Error fetching users:', error);
// //         res.status(500).json({ message: 'Internal server error' });
// //     }
// // }

// // exports.checkFollwing = async (req, res) => {
// //     const { userId, id } = req.params;
// //     console.log("🚀 ~ exports.checkFollwing= ~ profileId:", id)
// //     console.log("🚀 ~ exports.checkFollwing= ~ userId:", userId)

// //     try {
// //         const isFollowing = await User.exists({ follower: userId, following: id });
// //         console.log("🚀 ~ exports.checkFollwing= ~ isFollowing:", isFollowing)

// //         res.status(200).json({ isFollowing: !!isFollowing }); 
// //     } catch (error) {
// //         console.error("Error checking follow status:", error);
// //         res.status(500).json({ message: "Error checking follow status" });
// //     }
// // };

// // exports.checkFollowing = async (req, res) => {
// //     const { userId, id } = req.params;
// //     console.log("🚀 ~ exports.checkFollowing= ~ profileId:", id);
// //     console.log("🚀 ~ exports.checkFollowing= ~ userId:", userId);

// //     try {
// //         // Check if the userId is in the following array of the user with the profileId
// //         const user = await User.findById(id);

// //         const isFollowing = user.followers.includes(userId);

// //         console.log("🚀 ~ exports.checkFollowing= ~ isFollowing:", isFollowing);

// //         res.status(200).json({ isFollowing });
// //     } catch (error) {
// //         console.error("Error checking follow status:", error);
// //         res.status(500).json({ message: "Error checking follow status" });
// //     }
// // };


// exports.getSuggestions = async (req, res) => {
//     console.log(req)
//     const { userId } = req.query;
//     console.log("🚀 ~ exports.getSuggestions= ~ userId:", userId);

//     try {
//         // Validate userId
//         // if (!mongoose.Types.ObjectId.isValid(userId)) {
//         //     return res.status(400).json({ message: 'Invalid userId' });
//         // }

//         const currentUser = await User.findById(userId);

//         if (!currentUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const suggestions = await User.find({
//             _id: { $ne: userId, $nin: currentUser.following },
//         })
//             .select('username avatar followers')
//             .limit(10);

//         res.status(200).json(suggestions);
//     } catch (error) {
//         console.error('Error fetching suggestions:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };


// exports.allFriends = async (req, res) => {
//     try {
//         const userId = req?.user?._id;
//         // Find the user by ID and populate followers and following
//         const user = await User.findById(userId)
//             .populate('followers', 'username email')
//             .populate('following', 'username email');

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Combine followers and following into a single list
//         const allFriends = [...user.followers, ...user.following];

//         // Filter unique friends by _id
//         const uniqueFriends = allFriends.filter((friend, index, self) =>
//             index === self.findIndex(f => f._id.toString() === friend._id.toString())
//         );

//         res.status(200).json({ uniqueFriends });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };


const Notification = require('../models/Notification');
const mongoose = require('mongoose');
const User = require('../models/User');

// Follow a user
exports.followUser = async (req, res) => {
    try {
        // const { userId } = req.query;
        const { id } = req.body;
        console.log("🚀 ~ exports.followUser= ~ userId:", id)

        // Validate userId and req.user._id
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(req.user._id)) {
            return res.status(400).json({ message: 'Invalid user ID in request' });
        }

        const currentUserId = req.user._id;
        console.log("🚀 ~ exports.followUser= ~ currentUserId:", currentUserId)

        // Find the target user to follow
        const targetUser = await User.findById(id);
        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the current user is already following the target user
        if (targetUser.followers.includes(currentUserId)) {
            return res.status(400).json({ message: 'You are already following this user' });
        }

        // Add the current user to the target user's followers list
        targetUser.followers.push(currentUserId);
        await targetUser.save();

        // Add the target user to the current user's following list
        const currentUser = await User.findById(currentUserId);
        currentUser.following.push(targetUser._id);
        await currentUser.save();

        // Notification for following
        // await new Notification({
        //     user: targetUser._id,
        //     type: 'follow',
        //     message: `${currentUser.username} started following you`,
        //     relatedUser: currentUserId,
        // }).save();

        return res.status(200).json({
            data: {
                message: 'Followed successfully',
                followstatus: true
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            data: {
                message: 'Failed to follow user',
                error: error.message,
                success: false
            }
        });
    }
};


// Unfollow a user
exports.unfollowUser = async (req, res) => {
    try {
        const { id } = req.body; // Target user ID to unfollow
        console.log("🚀 ~ exports.unfollowUser= ~ id:", id)
        const currentUserId = req.user._id; // Current user ID from request
        console.log("🚀 ~ exports.unfollowUser= ~ currentUserId:", currentUserId)

        // Validate userId and req.user._id
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(currentUserId)) {
            return res.status(400).json({ message: 'Invalid user ID in request' });
        }

        // Find the current user
        const currentUser = await User.findById(currentUserId);
        if (!currentUser) {
            return res.status(404).json({ message: 'Current user not found' });
        }

        // Find the target user to unfollow
        const targetUser = await User.findById(id);
        if (!targetUser) {
            return res.status(404).json({ message: 'User to unfollow not found' });
        }

        // Check if the current user is following the target user
        if (!currentUser.following.includes(id)) {
            return res.status(400).json({ message: 'You are not following this user' });
        }

        // Remove the target user from the current user's following list
        currentUser.following = currentUser.following.filter(userId => userId.toString() !== id);
        await currentUser.save();

        // Remove the current user from the target user's followers list
        targetUser.followers = targetUser.followers.filter(followerId => followerId.toString() !== currentUserId);
        await targetUser.save();

        return res.status(200).json({
            data: {
                message: 'Unfollowed successfully',
                followstatus: false
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            data: {
                message: 'Failed to unfollow user',
                error: error.message,
                followstatus: false
            }
        });
    }
};

exports.checkFollowing = async (req, res) => {
    const { userId, id } = req.params;

    try {
        // Check if the userId is in the following array of the user with the profileId

        // const user = await User.findById(id);
        // const isFollowing = user.followers.includes(userId);
        const user = await User.findOne({ _id: id, followers: userId });

        const isFollowing = !!user;

        console.log("🚀 ~ exports.checkFollowing= ~ isFollowing:", isFollowing);

        res.status(200).json({ isFollowing });
    } catch (error) {
        console.error("Error checking follow status:", error);
        res.status(500).json({ message: "Error checking follow status" });
    }
};

// Get all users
exports.getAllusers = async (req, res) => {
    try {
        const users = await User.find().select('_id username'); // Only fetch `_id` and `username`

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get friends
exports.allFriends = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('friends', 'username');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user.friends);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get suggestions
exports.getSuggestions = async (req, res) => {
    try {
        const suggestions = await User.find({ _id: { $ne: req.user.id } }).limit(5).select('_id username');
        res.status(200).json(suggestions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Notifications (dummy example)
exports.getNotifications = async (req, res) => {
    res.status(200).json({ message: 'Here are your notifications' });
};