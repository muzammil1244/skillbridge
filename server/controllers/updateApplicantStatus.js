import Job from "../models/Job.js"; // ✅ Make sure it's imported

export const updateApplicantStatus = async (req, res) => {
  const { jobId, freelancerId } = req.params;
  const { status } = req.body;

  try {
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const applicant = job.applicants.find(app => app.freelancer.toString() === freelancerId);

    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    applicant.status = status;

    await job.save();

    res.status(200).json({ message: "Status updated successfully", updatedStatus: applicant.status });
  } catch (error) {
    console.error("Error updating applicant status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
