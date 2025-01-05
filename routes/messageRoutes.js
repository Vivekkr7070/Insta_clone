const express = require('express');
const { getMessages } = require('../controllers/messageController');
const auth = require('../middleware/auth');

const router = express.Router();

// Route to get messages between two users
// router.get('/:userId/messages/:otherUserId', auth, getMessages);
router.get('/messages/:friendId',getMessages)

module.exports = router;