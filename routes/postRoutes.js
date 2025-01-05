const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');
const auth = require('../middleware/auth');
const router = express.Router();
const Upload = require('../utils/fileUpload'); // Multer middleware

// router.post('/', auth, createPost);
router.get('/', getPosts);
// router.get('/', auth, getPosts);
router.post('/', [Upload,auth], createPost); // Add upload middleware for single image

module.exports = router;