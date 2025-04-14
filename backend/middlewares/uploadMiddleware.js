const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

 cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

 const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'resumes',  
    allowed_formats: ['pdf'],
    resource_type: 'raw',  
    public_id: (req, file) => `resume_${Date.now()}`,
  },
});

 const upload = multer({ storage: storage });

module.exports = upload;
