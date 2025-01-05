const express = require('express');
const { createComment, getComments } = require('../controllers/commentController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/:postId/comments', auth, createComment);
router.get('/:postId/comments', auth, getComments);

module.exports = router;