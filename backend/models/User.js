const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['jobseeker', 'employer', 'admin'],
      default: 'jobseeker',
    },

    bio: {
      type: String,
      default: '',
    },

    skills: {
      type: [String],
      default: [],
    },

    experience: {
      type: String,
      default: '',
    },

    location: {
      type: String,
      default: '',
    },
    resumeUrl: {
      type: String,
      default: '',
    },
    appliedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
      }
    ],
    avatar: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
