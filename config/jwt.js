const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.createToken = (userId) => jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
exports.verifyToken = (token) => jwt.verify(token, JWT_SECRET);