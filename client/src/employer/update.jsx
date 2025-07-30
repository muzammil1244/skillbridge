import { useState,useEffect } from "react";

import { ArrowLeft01Icon, ArrowLeft03Icon, ArrowLeft04Icon } from "hugeicons-react"
import { useLocation, useNavigate } from "react-router-dom"
export  function 


Update() {
  const navigate = useNavigate()
const [jobData, setJobData] = useState({
  title: "",
  description: "",
  skill: [],
  budget: "",
  deadline: "",
  jobtype: "work from Home",
  salary: "",
  canapply: "",
  opportunity: "",
  active: false,         // ✅ Initialize as false
  imageFile: null        // ✅ Rename properly for file
});

const [loader ,setloader]= useState(false)
  const [skillInput, setSkillInput] = useState("");

const handleChange = (e) => {
  const { name, value, type, files, checked } = e.target;

  if (type === "file") {
    setJobData((prev) => ({ ...prev, imageFile: files[0] }));
  } else if (type === "checkbox") {
    setJobData((prev) => ({ ...prev, [name]: checked }));
  } else {
    setJobData((prev) => ({ ...prev, [name]: value }));
  }
};


  const addSkill = () => {
    if (skillInput.trim() !== "") {
      setJobData({ ...jobData, skill: [...jobData.skill, skillInput] });
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    const newSkills = [...jobData.skill];
    newSkills.splice(index, 1);
    setJobData({ ...jobData, skill: newSkills });
  };

 

  const location = useLocation()


const job = location?.state?.element;

const updateID = job._id
  // updata jobs

  useEffect(() => {
  if (job) {
    setJobData({
      title: job.title || "",
      description: job.description || "",
      skill: job.skill || [],
      budget: job.budget || "",
      deadline: job.deadline?.slice(0, 10) || "", // ✅ Date ko format karo
      jobtype: job.jobtype || "work from Home",
      salary: job.salary || "",
      canapply: job.canapply || "",
      opportunity: job.opportunity || "",
      active: job.active || false,
      imageFile: null, // File upload blank hi rahega
    });
  }
}, [job]);





  const handleUpdate = async () => {
    setloader(true)
    if (new Date(jobData.deadline) < new Date()) {
  alert("Deadline should be a future date.");
  setloader(false);
  return;
}
  const formData = new FormData();
  formData.append("title", jobData.title);
  formData.append("description", jobData.description);
  formData.append("skill", JSON.stringify(jobData.skill));
  formData.append("budget", jobData.budget);
  formData.append("deadline", jobData.deadline);
  formData.append("jobtype", jobData.jobtype);
  formData.append("salary", jobData.salary);
  formData.append("canapply", jobData.canapply);
  formData.append("opportunity", jobData.opportunity);
  formData.append("active", jobData.active);
  if (jobData.imageFile) {
    formData.append("image", jobData.imageFile); // 👈 image file here
  }

  const token = localStorage.getItem("token");

  try {
    await fetch(`http://localhost:5000/api/employer/update/${updateID}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
setloader(false)
    navigate("/employer/home")
  } catch (err) {
    console.error("Update error:", err);
  }
};


  return (

     <div
      data-theme={location.state?.themtrue ? "dark" : ""}
      className="flex justify-around dark:bg-bg-dark"
    >
     <div className="flex p-5 justify-center h-15 hidden lg:block items-center gap-4">
                                            <h1 className="text-sm text-purple-500 dark:text-white font-bold"> Skill <span className="text-blue-900 dark:text-accent-color ">Bridge</span> </h1>

      </div>

      <form
       onSubmit={(e) => {
  e.preventDefault();
  handleUpdate();
}}
        className="lg:w-[70%] w-full mx-auto p-6 bg-white dark:bg-card-color shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-500 dark:text-accent-color">
          <span
            onClick={() => navigate("/employer/home")}
            className="size-fit cursor-pointer"
          >
            <ArrowLeft03Icon className="size-8 hover:scale-120 duration-200" />
          </span>
          Update Job
        </h2>

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={jobData.title}
          onChange={handleChange}
          className="w-full mb-4 p-2 border dark:border-border-color rounded dark:text-text-color"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Job Description"
          value={jobData.description}
          onChange={handleChange}
          className="w-full mb-4 p-2 border dark:border-border-color dark:text-text-color rounded"
        />

        {/* Skills */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 dark:text-secondary-text-color">Skills</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="flex-1 p-2 border dark:border-border-color dark:text-text-color rounded"
              placeholder="Enter a skill and press Add"
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-3 py-2 bg-purple-500 dark:bg-accent-color text-white rounded"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {jobData.skill.map((sk, idx) => (
              <div
                key={idx}
                className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span>{sk}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(idx)}
                  className="text-red-500 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Budget */}
        <input
          type="number"
          name="budget"
          placeholder="Salary"
          value={jobData.budget}
          onChange={handleChange}
          className="w-full mb-4 p-2 border dark:border-border-color dark:text-text-color rounded"
        />

        {/* Deadline */}
        <input
          type="date"
          name="deadline"
          value={jobData.deadline}
          placeholder="Date"
          onChange={handleChange}
          className="w-full mb-4 p-2 border dark:border-border-color dark:text-text-color rounded"
        />

        {/* Job Type */}
        <select
          name="jobtype"
          value={jobData.jobtype}
          onChange={handleChange}
          className="w-full mb-4 p-2 border dark:border-border-color dark:text-text-color rounded"
        >
          <option value="work from Home" className="dark:text-secondary-text-color dark:bg-card-color">
            Work from Home
          </option>
          <option value="work from office" className="dark:text-secondary-text-color dark:bg-card-color">
            Work from Office
          </option>
        </select>

        {/* Salary */}
        <input
          type="number"
          name="salary"
          placeholder="Budget"
          value={jobData.salary}
          onChange={handleChange}
          className="w-full mb-4 p-2 border dark:border-border-color dark:text-text-color rounded"
        />

        {/* Who can apply */}
        <input
          type="text"
          name="canapply"
          placeholder="Who can apply?"
          value={jobData.canapply}
          onChange={handleChange}
          className="w-full mb-4 p-2 border dark:border-border-color dark:text-text-color rounded"
        />

        {/* Opportunity */}
        <input
          type="number"
          name="opportunity"
          placeholder="No. of Opportunities"
          value={jobData.opportunity}
          onChange={handleChange}
          className="w-full mb-4 p-2 border dark:border-border-color dark:text-text-color rounded"
        />

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 dark:text-secondary-text-color">Company Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 border rounded dark:border-border-color dark:text-text-color"
          />
        </div>

        {/* Active Hiring Checkbox */}
        <div className="mb-6 flex items-center gap-2">
          <input
            type="checkbox"
            name="active"
            checked={jobData.active}
            onChange={handleChange}
            className="w-4 h-4 cursor-pointer"
          />
          <label className="text-gray-800 dark:text-secondary-text-color font-medium">
            Currently hiring (Active)
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-500 dark:bg-accent-color dark:hover:bg-accent-light duration-200 text-white py-2 rounded hover:bg-purple-700"
        >
         {loader? <div className="flex w-full h-full justify-center items-center" role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 dark:fill-white  fill-purple-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>:<h2>Update</h2>}
        </button>
      </form>
    </div>
    
  );
}
