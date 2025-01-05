const { verifyToken } = require('../config/jwt');

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    console.log(token)
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = verifyToken(token);
        req.user = { _id: decoded.userId };  // Store the user object properly
        console.log(req.user)
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = auth;