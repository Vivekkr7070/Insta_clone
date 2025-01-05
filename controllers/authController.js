const User = require('../models/User');
const { createToken } = require('../config/jwt');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if all required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Create new user
        const user = new User({ username, email, password });

        // Save user to the database
        await user.save();

        // Generate JWT token
        const token = createToken(user._id);

        return res.status(201).json({ message: 'Registration successful', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};


// exports.login = async (req, res) => {
//     try {
//         const { email, password, username } = req.body;
//         console.log(req.body)
//         // Validate required fields
//         if (!password || (!email && !username)) {
//             return res.status(400).json({ message: 'Email or username and password are required' });
//         }

//         // Find user by email or username
//         const user = await User.findOne({ $or: [{ email }, { username }] });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // Generate JWT token if credentials are valid
//         // const token = createToken(user._id);
//         const token = jwt.sign({ username: user.username, userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.status(200).json({
//             status: 200,
//             message: 'Login successful',
//             token,
//             userId: user._id
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Login failed', error: error.message });
//     }
// };



exports.login = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        if (!password || (!email && !username)) {
            return res
                .status(400)
                .json({ status: 400, message: 'Email or username and password are required' });
        }

        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (!user) {
            return res.status(400).json({ status: 400, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: 400, message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { username: user.username, userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            status: 200,
            message: 'Login successful',
            token,
            userId: user._id,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'Login failed', error: error.message });
    }
};