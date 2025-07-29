import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'skillbridge/job-images',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'skillbridge/resumes',
    allowed_formats: ['pdf', 'doc', 'docx'],
  },
});
const messageStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const fileType = file.mimetype.split("/")[0]; // image, video, application
    return {
      folder: 'skillbridge/messages',
      resource_type: fileType === 'video' ? 'video' : 'auto',
      allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'mp4', 'docx', 'doc', 'txt'],
    };
  },
});

export { cloudinary, imageStorage, resumeStorage ,messageStorage};
