const Job = require("../models/Job");
const sendEmail = require("../utils/sendEmail");

exports.createJob = async (req, res) => {
  try {
    const { title, description, company, location, salary } = req.body;
    const userId = req.user.id;

    const newJob = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      postedBy: userId,
    });

    const adminMsg = `
      <h2>New Job Posted</h2>
      <p><strong>Title:</strong> ${newJob.title}</p>
      <p><strong>Company:</strong> ${newJob.company}</p>
      <p><strong>Location:</strong> ${newJob.location}</p>
      <p><strong>Posted By User ID:</strong> ${userId}</p>
    `;
    await sendEmail(
      process.env.ADMIN_EMAIL,
      "New Job Posted on Job Finder",
      adminMsg
    );

    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating job", error: error.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const { skills, location, minSalary, experience } = req.query;

    const query = {};

    if (skills) {
      query.skills = { $in: skills.split(",") };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (minSalary) {
      query.salary = { $gte: Number(minSalary) };
    }

    if (experience) {
      query.experience = experience;
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    res.status(200).json({ count: jobs.length, jobs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch jobs", error: error.message });
  }
};
