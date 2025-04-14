const express = require('express');
const router = express.Router();
const { getMyProfile, updateProfile } = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');

router.get('/profile', authenticate, getMyProfile);
router.put('/profile', authenticate, updateProfile);

module.exports = router;
