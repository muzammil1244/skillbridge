import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { upload } from "../middleware/multersetup.js";
const router = Router();

router.post("/register",upload.single("profileImage"), register);
router.post("/login", login);

export default router;
