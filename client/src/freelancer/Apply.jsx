import { ArrowLeft02Icon, ArrowLeft04Icon, ArrowLeft05Icon, Backpack02Icon, Building03Icon, File02Icon, GoBackward10SecIcon, Note01Icon, Office365Icon, StarCircleIcon } from 'hugeicons-react';
import  { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {motion} from "motion/react"
export   function Apply() {
  const [form, setForm] = useState({
    resume: '',
    coverlater: '',
    rating: '',
  });

    const location = useLocation()
const navigate = useNavigate()
const jobid = location.state?.jobid;

useEffect(() => {
  if (!jobid) {
    console.error("Job ID not found in location.state");
    navigate("/freelancer/home"); // redirect or handle gracefully
  }
}, [jobid, navigate]);
const [truenot, setTruenot] = useState(false);
const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (name === "resume") {
    setForm({ ...form, resume: files[0] }); // get the actual file
  } else {
    setForm({ ...form, [name]: value });
  }
};

const Applyfun = async(e)=>{
e.preventDefault()

if (!form.resume || !form.coverlater || !form.rating) {
  console.warn("All fields required");
  return;
}
const applydata = new FormData()


applydata.append("resume",form.resume),
applydata.append("coverlater",form.coverlater),
applydata.append("rating",form.rating)

 const token = localStorage.getItem("token")



try{

const data = await fetch(`https://skillbridge-x62a.onrender.com/api/${jobid}/jobapply`,{
  method:"POST",
  headers: {
        "Authorization": `Bearer ${token}`,
      },
  body:applydata,
    
})


if(!data.ok){
  console.log(data)
}
 setTruenot(true); // Set value to true

 navigate("/freelancer/home",{
  state:{truenot:true}
 })
   

    // Optional: Reset your local state after 3s if needed
    setTimeout(() => {
      setTruenot(false);
    }, 3000);
console.log(data)
}catch(err){
  console.log(err)
}

}




const themtrue = location.state?.themtrue ?? false;



  return (
   <div

  data-theme={`${themtrue ? "dark" : ""}`}
  className="min-h-screen w-full dark:bg-border-color bg-purple-100 flex items-center justify-center px-4 py-6"
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl bg-white dark:bg-bg-dark rounded-2xl shadow-xl overflow-hidden">
    {/* Apply Form */}
    <div className="p-8">
      <h2 className="text-2xl font-bold text-purple-600 dark:text-text-color mb-6">
        Submit Your Application
      </h2>

      <form onSubmit={Applyfun} className="grid gap-6">
        {/* Resume Upload */}
        <div>
          <label className="text-sm font-semibold text-gray-700 dark:text-text-color block mb-2">
            Upload Resume
          </label>
          <input
            type="file"
            name="resume"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-xl border dark:text-secondary-text-color border-gray-300 dark:border-border-color bg-white dark:bg-border-color text-sm outline-none focus:ring-2 focus:ring-border-color"
          />
        </div>

        {/* Cover Letter */}
        <div>
          <label className="text-sm font-semibold text-gray-700 dark:text-text-color block mb-2">
            Why are you suitable for this opportunity?
          </label>
          <textarea
            name="coverlater"
            rows="4"
            onChange={handleChange}
            className="w-full px-4 py-3 dark:text-secondary-text-color rounded-xl border border-gray-300 dark:border-border-color bg-white dark:bg-border-color text-sm outline-none focus:ring-2 focus:ring-border-color resize-none"
            placeholder="Write your cover letter here..."
          ></textarea>
        </div>

        {/* Rating */}
        <div>
          <label className="text-sm font-semibold text-gray-700 dark:text-text-color block mb-2">
            Rate yourself (0 to 5)
          </label>
          <input
            type="number"
            name="rating"
            min={0}
            max={5}
            onChange={handleChange}
            placeholder="e.g. 4"
            className="w-full px-4 dark:text-secondary-text-color py-2 rounded-xl border border-gray-300 dark:border-border-color bg-white dark:bg-border-color text-sm outline-none focus:ring-2 focus:ring-border-color"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 dark:bg-secondary-text-color dark:text-card-color hover:bg-purple-700 transition-colors duration-200 text-white py-2 rounded-xl font-semibold text-sm shadow-lg"
        >
          Submit Application
        </button>
      </form>
    </div>

    {/* Guidelines Panel */}
    <div className="bg-purple-50 dark:bg-card-color px-8 py-10 space-y-8">
      <div>
        <h3 className="text-xl flex items-center gap-2 font-bold text-orange-500 dark:text-accent-color mb-2">
         <File02Icon/> Resume Submission Required
        </h3>
        <p className="text-sm text-gray-700 dark:text-secondary-text-color">
          All applicants must upload a recent and updated resume. Incomplete applications will not be considered.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold flex items-center text-orange-500 dark:text-accent-color mb-2">
         <StarCircleIcon/> Self-Rating is Mandatory
        </h3>
        <p className="text-sm text-gray-700 dark:text-secondary-text-color">
          Please rate your skills honestly on a scale of 1 to 5. This helps employers understand your strengths.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold flex items-center text-orange-500 dark:text-accent-color mb-2">
          <Building03Icon/> Professional Presentation
        </h3>
        <p className="text-sm text-gray-700 dark:text-secondary-text-color">
          Keep your answers professional and respectful. Inappropriate content may lead to rejection.
        </p>
      </div>

      <div className='text-center'>
        <h3 className="text-xl font-bold text-orange-500 dark:text-accent-color mb-2">
           Impress with Authenticity
        </h3>
        <p className="text-sm text-gray-700 dark:text-secondary-text-color">
          Be honest and confident. Highlight strengths, but avoid exaggeration.
        </p>
      </div>
    </div>
  </div>
</div>

  );
}
