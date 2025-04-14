const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    company: { type: String, required: true },
    location: { type: String, required: true },
    skills: { type: [String], required: true },
    salary: { type: Number, required: true },
    experience: { type: String, default: '0 years' },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
