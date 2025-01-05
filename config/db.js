const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

module.exports = connectDB;


// const updateImageField = async () => {
//     try {
//         await Post.updateMany(
//             { imageUrl: { $exists: false } }, // Match documents missing `imageUrl`
//             { $set: { imageUrl: null } }      // Add `imageUrl` with a default value
//         );
//         console.log("Updated all posts to include imageUrl");
//     } catch (error) {
//         console.error("Failed to update posts:", error.message);
//     } finally {
//         mongoose.connection.close(); // Close the connection after the script runs
//     }
// };

// updateImageField();