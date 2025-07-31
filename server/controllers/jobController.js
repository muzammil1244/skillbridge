import Job from "../models/Job.js";
import User from "../models/User.js";


export const jobcreate = async (req, res) => {
  try {
    const {
      title,
      description,
      skill,
      budget,
      deadline,
      jobtype,
      salary,
      canapply,
      opportunity,
      active,
    } = req.body;

    const parsedSkills = typeof skill === "string" ? JSON.parse(skill) : skill;

    const jobdata = new Job({
      title,
      description,
      skill: parsedSkills,
      budget,
      deadline,
      createBy: req.user.userID,
      jobtype,
      salary,
      canapply,
      opportunity,
      active: active === "true",
      image: req.file ? req.file.filename : null,
    });

    await jobdata.save();
    res.status(200).send(jobdata);
  } catch (err) {
    console.error("Job create error:", err.message);
    res.status(500).send({ error: "Job creation failed", details: err.message });
  }
};



export const Applyjob = async (req, res) => {

  const identy = req.params.jobId
  console.log("Job ID from request:", req.params.jobId);

  const job = await Job.findById(identy)

  console.log(job)

  if (!job) {

    return res.status(500).send("job not found")
  }





  const { coverlater, status, rating } = req.body
  const resume = req.file ? req.file.filename : null;

  const alreadyApplied = job.applicants.find(
    (app) => app.freelancer.toString() === req.user.userID
  );
  if (alreadyApplied) {
    return res.status(400).send("You already applied to this job");
  }

  try {
    job.applicants.push({ freelancer: req.user.userID, resume, coverlater, status, rating })
    await job.save();

    res.status(200).send("application succesfully submited")

  } catch (error) {
    res.status(500).send(error)
  }

}

export const UpdateJob = async (req, res) => {
  try {
    const updateId = req.params.updateID;
    const userId = req.user.userID;

    const {
      title,
      description,
      budget,
      deadline,
      jobtype,
      salary,
      canapply,
      opportunity,
      active,
    } = req.body;

    const parsedSkills = JSON.parse(req.body.skill || "[]");

    const updatedFields = {
      title,
      description,
      skill: parsedSkills,
      budget,
      deadline,
      jobtype,
      salary,
      canapply,
      opportunity,
      active: active === "true",
    };

    if (req.file) {
      updatedFields.image = req.file.filename;
    }

    const updatedJob = await Job.findOneAndUpdate(
      { _id: updateId, createBy: userId },
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).send("Job not found or unauthorized");
    }

    res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).send("Server error");
  }
};



export const getAppliedJobs = async (req, res) => {
  const freelancerId = req.user.userID;

  try {
    const appliedJobs = await Job.find({
      'applicants.freelancer': freelancerId
    })
      .populate('createBy', 'name email')            
      .populate('applicants.freelancer', 'name email')

    const result = appliedJobs.map(job => {
      const mine = job.applicants.find(a => a.freelancer._id.toString() === freelancerId);
      return {
        jobId: job._id,
        title: job.title,
        description: job.description,
        employer: job.createBy,
        application: {
          resume: mine.resume,
          coverlater: mine.coverlater,
          status: mine.status,
          appliedAt: mine.appliedAt
        }
      };
    });

    res.status(200).json(result);
  } catch (err) {
    console.error('Error getting applied jobs:', err);
    res.status(500).send('Internal Server Error');
  }
};

export const Jobs = async (req, res) => {

  try {
    const data = await Job.find()

    return res.json(data)
  } catch (err) {
    res.send(err)
  }



}



