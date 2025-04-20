const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Job = require("../models/Job");
const { Parser } = require('json2csv');   
 

exports.exportUsers = async (req, res) => {
  try {
    const users = await User.find();   
    
    const fields = ['name', 'email', 'role', 'appliedJobs'];   
    const json2csvParser = new Parser({ fields });   
    const csv = json2csvParser.parse(users);   

    res.header('Content-Type', 'text/csv');   
    res.attachment('users.csv');   
    res.send(csv);   

  } catch (error) {
    res.status(500).json({ message: 'Error exporting users', error: error.message });
  }
};


exports.exportJobs = async (req, res) => {
  try {
    const jobs = await Job.find();   
    const fields = ['title', 'company', 'location', 'salary', 'applicants'];  
    const json2csvParser = new Parser({ fields });  
    const csv = json2csvParser.parse(jobs);   

    res.header('Content-Type', 'text/csv');  
    res.attachment('jobs.csv');   
    res.send(csv);   

  } catch (error) {
    res.status(500).json({ message: 'Error exporting jobs', error: error.message });
  }
};

 
exports.getDashboardStats = async (req, res) => {
  try {
   
    const totalUsers = await User.countDocuments();

   
    const totalJobs = await Job.countDocuments();

   
    const users = await User.find(); 
    let totalApplications = 0;

     users.forEach((user) => {
      totalApplications += user.appliedJobs.length;
    });

     res.status(200).json({
      totalUsers,
      totalJobs,
      totalApplications,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard stats", error: error.message });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");  
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

 exports.deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User deleted" });
    } catch (err) {
      console.error("Delete User Error: ", err); 
      res.status(500).json({ message: "Error deleting user" });
    }
  };
  

 exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to get jobs" });
  }
};

 exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ message: "Failed to create job" });
  }
};

 
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(job);
  } catch (err) {
    res.status(400).json({ message: "Failed to update job" });
  }
};

 
exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting job" });
  }
};

 const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

 exports.registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = await Admin.create({ email, password });
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

 exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(admin._id);
    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
