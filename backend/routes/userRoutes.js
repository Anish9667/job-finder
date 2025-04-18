const express = require("express");
const router = express.Router();
const {
  getMyProfile,
  updateProfile,
  uploadResume,
  getApplicationHistory,
  applyForJob,  
} = require("../controllers/userController");

const authenticate = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

 router.get("/profile", authenticate, getMyProfile);
router.put("/update", authenticate, updateProfile);

 router.post(
  "/upload-resume",
  authenticate,
  upload.single("resume"),
  uploadResume
);

 router.get("/my-applications", authenticate, getApplicationHistory);

 router.post("/jobs/apply", authenticate, applyForJob);  

module.exports = router;
