import { Router } from "express";
import { getAppliedJobs, Applyjob, jobcreate, UpdateJob, Jobs } from "../controllers/jobController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { employer } from "../controllers/ProfileController.js";
import { JobMiddleware } from "../middleware/jobMiddleware.js";
import { upload } from "../middleware/multersetup.js";

const route = Router();
route.post("/jobcreate", authenticateToken,JobMiddleware,upload.single("image"),jobcreate)
route.post("/:jobId/jobapply",authenticateToken,upload.single("resume"),Applyjob)
route.get("/employer/jobs", authenticateToken,JobMiddleware, employer);
route.patch("/employer/update/:updateID",authenticateToken,JobMiddleware,upload.single("image"),UpdateJob)
route.get('/freelancer/applied-jobs',authenticateToken,getAppliedJobs);
route.get('/freelancer/jobs',authenticateToken,Jobs)

export default route