import { useState } from "react";
import { ArrowLeft03Icon } from "hugeicons-react";
import { useLocation, useNavigate } from "react-router-dom";

export function Create() {
  const navigate = useNavigate();
  const location = useLocation();

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
    image: null,
    active: true, // ✅ New field for Active Hiring
  });

  const [skillInput, setSkillInput] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setJobData({ ...jobData, [name]: files[0] });
    } else if (type === "checkbox") {
      setJobData({ ...jobData, [name]: checked });
    } else {
      setJobData({ ...jobData, [name]: value });
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

  const CreateJob = async (e) => {
    e.preventDefault();
const token = localStorage.getItem("token")
    try {
      const formData = new FormData();
      formData.append("title", jobData.title);
      formData.append("description", jobData.description);
      formData.append("budget", jobData.budget);
      formData.append("deadline", jobData.deadline);
      formData.append("jobtype", jobData.jobtype);
      formData.append("salary", jobData.salary);
      formData.append("canapply", jobData.canapply);
      formData.append("opportunity", jobData.opportunity);
      formData.append("active", jobData.active); // ✅ Send checkbox value
      formData.append("skill", JSON.stringify(jobData.skill));
      if (jobData.image) {
        formData.append("image", jobData.image);
      }

      const response = await fetch("https://skillbridge-x62a.onrender.com/api/jobcreate", {
        method: "POST",
        headers:{
"Authorization":`Bearer ${token}`
        },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Job posted successfully");
        navigate("/employer/home");
      } else {
        alert("Job post failed: " + result.error);
      }
    } catch (err) {
      console.error("Error:", err);
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
        onSubmit={CreateJob}
        className="lg:w-[70%] w-full mx-auto p-6 bg-white dark:bg-card-color shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-500 dark:text-accent-color">
          <span
            onClick={() => navigate("/employer/home")}
            className="size-fit cursor-pointer"
          >
            <ArrowLeft03Icon className="size-8 hover:scale-120 duration-200" />
          </span>
          Create Job
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
          Post Job
        </button>
      </form>
    </div>
  );
}
