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
  getDashboardStats,
  exportUsers, 
  exportJobs,bulkDeleteJobs, 
  bulkUpdateJobs,
} = require("../controllers/adminController");

const adminAuth = require("../middlewares/adminAuth");
const checkRole = require("../middlewares/roleMiddleware");


router.delete("/jobs/bulk-delete", adminAuth, bulkDeleteJobs);
router.put("/jobs/bulk-update", adminAuth, bulkUpdateJobs);
router.get('/export/users', adminAuth, exportUsers);

 router.get('/export/jobs', adminAuth, exportJobs);

router.get("/dashboard", adminAuth, getDashboardStats);
 router.get("/users", adminAuth, checkRole("admin"), getAllUsers);
router.delete("/users/:id", adminAuth, deleteUser);

 router.get("/jobs", adminAuth, getAllJobs);
router.post("/jobs", adminAuth, createJob);
router.put("/jobs/:id", adminAuth, updateJob);
router.delete("/jobs/:id", adminAuth, deleteJob);
 router.post("/registerAdmin", registerAdmin);

 router.post("/login", loginAdmin);

module.exports = router;
