import {Router} from "express"
import { Deletejob, getAppliedJobs, getPostedJobsWithApplicants, Profile, UpdateProfile } from "../controllers/ProfileController.js"
import { authenticateToken } from "../middleware/authMiddleware.js"
import { upload } from "../middleware/multersetup.js";
import { updateApplicantStatus } from "../controllers/updateApplicantStatus.js";



 const route = Router()


route.delete("/delete/:DeleteId", authenticateToken,Deletejob)

route.patch("/user/profileupdate",authenticateToken,upload.single("profileImage"),UpdateProfile)
route.get("/user/applyedjobs",authenticateToken,getAppliedJobs)
route.get("/employer/:jobId",authenticateToken,getPostedJobsWithApplicants)
route.get("/profile",authenticateToken,Profile)
route.patch("/update-status/:jobId/:freelancerId",authenticateToken, updateApplicantStatus);

export default route