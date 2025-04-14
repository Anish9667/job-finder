const User = require('../models/User');
exports.getApplicationHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate('appliedJobs');

    res.status(200).json({
      message: 'Your Applied Jobs',
      appliedJobs: user.appliedJobs,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch applied jobs', error: error.message });
  }
};

exports.applyJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.body;

     const user = await User.findById(userId);
    if (user.appliedJobs.includes(jobId)) {
      return res.status(400).json({ message: 'You already applied to this job.' });
    }

     user.appliedJobs.push(jobId);
    await user.save();

     res.status(200).json({ message: 'Job applied successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error applying job', error: error.message });
  }
};

 exports.uploadResume = async (req, res) => {
  try {
    const userId = req.user.id;
    const resumeUrl = req.file.path;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { resumeUrl },
      { new: true }
    );

    res.status(200).json({
      message: 'Resume uploaded successfully!',
      resumeUrl: updatedUser.resumeUrl,
    });
  } catch (error) {
    res.status(500).json({ message: 'Resume upload failed', error: error.message });
  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
};

 
exports.updateProfile = async (req, res) => {
  try {
    const { bio, skills, experience, location, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { bio, skills, experience, location, avatar },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
};
