import express from "express"
import { authenticateToken } from "../middleware/authMiddleware.js"
import { Addreview, Getreview } from "../controllers/Review.js"



 const router = express.Router()

router.get("/review",authenticateToken,Getreview)
router.post("/add/review",authenticateToken,Addreview)

export default router; 
