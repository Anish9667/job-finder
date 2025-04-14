const Job = require('../models/Job');


 exports.createJob = async (req, res) => {
  try {
    const { title, company, description, location, skills, salary } = req.body;

     const newJob = new Job({
      title,
      company,
      description,
      location,
      skills,
      salary,
      postedBy: req.user.id,  
    });

     await newJob.save();

    res.status(201).json({
      message: 'Job created successfully',
      job: newJob,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create job', error: error.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const { skills, location, minSalary, experience } = req.query;

    const query = {};

    if (skills) {
      query.skills = { $in: skills.split(',') };
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
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
    res.status(500).json({ message: 'Failed to fetch jobs', error: error.message });
  }
};
