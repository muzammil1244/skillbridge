import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { uploadImage } from "../upload.js";
const router = Router();

router.post("/register",uploadImage.single("profileImage"), register);
router.post("/login", login);

export default router;
