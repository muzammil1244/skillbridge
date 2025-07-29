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
    const [loader,setloader] = useState(false)


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
  return;
}
const applydata = new FormData()


applydata.append("resume",form.resume),
applydata.append("coverlater",form.coverlater),
applydata.append("rating",form.rating)

 const token = localStorage.getItem("token")
setloader(true)


try{

const data = await fetch(`https://skillbridge-x62a.onrender.com/api/${jobid}/jobapply`,{
  method:"POST",
  headers: {
        "Authorization": `Bearer ${token}`,
      },
  body:applydata,
    
})


if(!data.ok){
    setloader(false)

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
           {loader? <div className="flex w-full h-full justify-center items-center" role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 dark:fill-white  fill-purple-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>:<h2>Submit Application</h2>}
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
