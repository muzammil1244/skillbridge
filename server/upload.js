import multer from "multer";
import { imageStorage, resumeStorage,messageStorage } from "./config/cloudinary.js";

export const uploadImage = multer({ storage: imageStorage });
export const uploadResume = multer({ storage: resumeStorage });
export const uploadMessage = multer({storage:messageStorage})