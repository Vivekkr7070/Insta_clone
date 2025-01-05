// const express = require('express');
// const { followUser, unfollowUser, getNotifications, getAllusers,allFriends, getUserById, getSuggestions } = require('../controllers/userController');
// const auth = require('../middleware/auth');
// const router = express.Router();

// // Follow and unfollow routes
// router.post('/:userId/follow', auth, followUser);
// // router.post('/follow', auth,followUser);// test form user id through param
// router.post('/:userId/unfollow', auth, unfollowUser);
// router.get('/:userId', getUserById);
// router.get('/suggestions', getSuggestions);
// router.get('/friends', auth, allFriends)
// router.get('/', getAllusers)
// // router.get("/is-following/:userId/:id",checkFollwing)

// module.exports = router;

const express = require('express');
const { followUser, unfollowUser, getNotifications, getAllusers, allFriends, getUserById, getSuggestions, checkFollowing } = require('../controllers/userController');

const auth = require('../middleware/auth');
const router = express.Router();

router.post('/:id/follow', auth, followUser);
router.post('/:id/unfollow', auth, unfollowUser);
router.get('/:userId', getUserById);
router.get('/suggestions', getSuggestions);
router.get('/friends', auth, allFriends);
router.get('/', getAllusers); // This route needs `getAllusers`
router.get("/is-following/:userId/:id", checkFollowing);

module.exports = router;