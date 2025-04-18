const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (to, subject, html) => {
  // 1. Create transporter using SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Email options
  const mailOptions = {
    from: `"Job Finder" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: subject,
    html: html,
  };

  // 3. Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
