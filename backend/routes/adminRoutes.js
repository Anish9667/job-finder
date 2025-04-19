const express = require("express");

const { registerAdmin, loginAdmin } = require("../controllers/adminController");
const router = express.Router();

const {
  getAllUsers,
  deleteUser,
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/adminController");

const adminAuth = require("../middlewares/adminAuth");
router.get("/dashboard", adminAuth, (req, res) => {
  res.send("Welcome Admin");
});
 router.get("/users", adminAuth, getAllUsers);
router.delete("/users/:id", adminAuth, deleteUser);

 router.get("/jobs", adminAuth, getAllJobs);
router.post("/jobs", adminAuth, createJob);
router.put("/jobs/:id", adminAuth, updateJob);
router.delete("/jobs/:id", adminAuth, deleteJob);
 router.post("/registerAdmin", registerAdmin);

 router.post("/login", loginAdmin);

module.exports = router;
