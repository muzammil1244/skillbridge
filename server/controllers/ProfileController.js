import { json } from "express"
import Job from "../models/Job.js"
import User from "../models/User.js"
import bcrypt from "bcrypt"
export const employer=async(req,res)=>{

    const myjobs = await Job.find({createBy:req.user.userID})
    console.log("Logged in employer ID:", req.user.userID)

    if(!myjobs) res.send("jobs not found")

try{
    res.json(myjobs)

}catch(err){
    res.status(401).send(err)
}


}

export const Deletejob=async(req,res)=>{

    const deleteId = req.params.DeleteId

    console.log("dlete id ",deleteId)

    const userId = req.user.userID

    if(!userId)console.log("user id not find  in deletejob")




    try{

    const result = await Job.findByIdAndDelete({ _id: deleteId, userId: userId });

        res.status(200).send("data have deleted",result)
    }catch(err){

        res.send("delete id problem",err)
    }


}



export const UpdateProfile = async (req, res) => {
  const userId = req.user?.userID;

  if (!userId) {
    return res.status(400).send("User ID not found");
  }

  const { name, email, password, roll } = req.body;
  const profileImage = req.file?.filename;

  const updateData = {};

  if (typeof name === "string" && name.trim() !== "") {
    updateData.name = name.trim();
  }

  if (typeof email === "string" && email.trim() !== "") {
    updateData.email = email.trim();
  }

  if (typeof roll === "string" && roll.trim() !== "") {
    updateData.roll = roll.trim();
  }

  if (profileImage) {
    updateData.profileImage = profileImage;
  }

  if (typeof password === "string" && password.trim() !== "") {
  const hashedPassword = await bcrypt.hash(password, 10);
  updateData.password = hashedPassword;
}


  try {
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No valid fields provided for update" });
    }

    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).send("User not found or profile not updated");
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedProfile,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    return res.status(500).send("Error updating profile");
  }
};





export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user.userID;
    const userRole = req.user.roll;

    if (userRole !== "freelancer") {
      return res.status(403).json({ message: "Access denied. Only freelancers can view this." });
    }

    const appliedJobs = await Job.find({ "applicants.freelancer": userId })
      .populate("createBy", "name email") 
      .populate("applicants.freelancer", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(appliedJobs);
  } catch (err) {
    console.error("Error fetching applied jobs:", err);
    res.status(500).send("Server error while fetching applied jobs");
  }
};





export const getPostedJobsWithApplicants = async (req, res) => {
  const employerId = req.user.userID;
  const jobId = req.params.jobId;

  console.log(employerId,jobId);
  
  try {
    const job = await Job.findOne({ _id: jobId, createBy: employerId })
      .populate({
        path: "applicants.freelancer",
        select: "name email profileImage"
      });

    if (!job) {
      return res.status(404).json({ message: "Job not found or unauthorized access" });
    }

    const applicantDetails = job.applicants.map(applicant => ({
      freelancerId: applicant.freelancer._id,
      name: applicant.freelancer.name,
      email: applicant.freelancer.email,
      profileImage: applicant.freelancer.profileImage || null,
      resume: applicant.resume,
      coverLater: applicant.coverlater,
      status: applicant.status,
      rating: applicant.rating || null,
      appliedAt: applicant.appliedAt
    }));

    res.status(200).json({
      jobId: job._id,
      title: job.title,
      totalApplicants: applicantDetails.length,
      applicants: applicantDetails
    });

  } catch (err) {
    console.error("Error fetching job applicants:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const Profile = async(req,res)=>{

     const freelancerId = req.user.userID
try{
       const user = await User.findById(freelancerId)

       res.json(user)

       if(!user){
        res.send("user not definde")
       }
}catch(err){
  res.send(err)
}

console.log(freelancerId)

}
