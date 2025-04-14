const express = require('express');
const router = express.Router();
const { getMyProfile, updateProfile } = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const { uploadResume } = require('../controllers/userController');
const {getApplicationHistory}=require('../controllers/userController')
router.get('/profile', authenticate, getMyProfile);
router.put('/profile', authenticate, updateProfile);
router.post('/upload-resume', authenticate, upload.single('resume'), uploadResume);
router.get('/my-applications', authenticate, getApplicationHistory);

module.exports = router;
