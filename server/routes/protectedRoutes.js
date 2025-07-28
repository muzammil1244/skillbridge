import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { JobMiddleware } from "../middleware/jobMiddleware.js";

const router = express.Router();

router.get("/dashboard", authenticateToken,JobMiddleware, (req, res) => {
  res.json({ message: `Welcome user ${req.user.userID}, this is a protected route.` });
});

export default router;
