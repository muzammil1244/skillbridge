import {  EyeIcon ,ArrowLeft02Icon, PermanentJobIcon, UserSquareIcon, Mail01Icon, Profile02Icon, TimeQuarterPassIcon} from "hugeicons-react";
import { useLocation, useNavigate } from "react-router-dom";

export const Review = () => {
  const navigate = useNavigate()

    const location = useLocation()

const job  = location.state.job
const themetrue = location.state?.themtrue


  const formatDate = (dateStr) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-GB", options);
  };


  console.log("themtreu",location.state);


  return (
    <div data-theme ={`${themetrue?"dark":""}`}  className="min-h-screen dark:bg-bg-dark bg-white p-6 flex gap-8 flex-col items-center justify-center">
<h1 className="dark:text-accent-color text-purple-500 font-extrabold text-sm md:text-3xl">
    Application Review
    </h1>      <div className="bg-white dark:bg-card-color shadow-md rounded-xl p-6 w-full max-w-3xl space-y-4 border dark:border-border-color border-gray-200">
        <div className="flex gap-10 items-center">

            <div className="flex gap-3 items-center">

                                                                 <h1 className="text-sm text-purple-500 dark:text-white font-bold"> Skill <span className="text-blue-900 dark:text-accent-color ">Bridge</span> </h1>

                        </div> 
<div  onClick={()=>{
  navigate("/freelancer/application")
 }} className="flex cursor-pointer items-center gap-3">
 <ArrowLeft02Icon className="hover:scale-120 duration-200  dark:text-accent-color text-purple-500 md:size-8 size-5 font-extrabold"  />
 <h1 className="font-extrabold text-sm dark:text-accent-color text-purple-500">Back</h1>
</div>
                                </div>
        <div className="flex justify-between items-center">
          <h2 className="md:text-xl flex gap-2 font-bold dark:text-text-color text-[15px] text-gray-800 capitalize"> 
            <PermanentJobIcon className="md:size-[20px] size-[16px]" />
            {job.title}
          </h2>
          <EyeIcon className="md:size-6 size-4 hover:scale-120 duration-200 dark:text-accent-color text-purple-600 dark:hover:text-accent-light hover:text-purple-800 cursor-pointer" />
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-gray-600 dark:text-text-color md:text-sm text-[12px]  flex gap-2 items-center">
            <UserSquareIcon className="md:size-[20px] size-[16px]"/>
            <span className="font-semibold">Employer:</span> {job.employer.name}
          </p>
          <p className="text-gray-600 md:text-sm text-[12px] dark:text-text-color flex gap-2 items-center  ">
            <Mail01Icon className="md:size-[20px] size-[16px]" />
            <span className="font-semibold">Email:</span> {job.employer.email}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-border-color dark:border-card-color p-4 rounded-md border">
          <p className="md:text-sm text-[12px]hover:scale-105 duration-200 cursor-pointer dark:hover:text-accent-light hover:text-orange-500 w-fit dark:border-b dark:border-accent-color dark:pb-1 dark:text-text-color text-gray-700 mb-1">
  <span className="font-semibold flex items-center md:text-sm text-[12px] gap-2">
    <Profile02Icon className="md:size-[20px] size-[16px]" />
    Resume:
    <a
      href={`https://skillbridge-x62a.onrender.com/uploads/${job.application.resume}`}
      target="_blank"
      rel="noopener noreferrer"
      className="underline md:text-sm text-[12px]"
    >
      {job.application.resume}
    </a>
  </span>
</p>
          <p className="md:text-sm text-[12px] dark:text-secondary-text-color text-gray-700">
            <span className="font-semibold">Cover Letter:</span>{" "}
            {job.application.coverlater}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm dark:text-text-color text-gray-600">
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span className="capitalize text-yellow-600">
              {job.application.status}
            </span>
          </p>
          <p className="flex md:text-sm text-[12px]">
            <span className="font-semibold flex gap-2"> <TimeQuarterPassIcon className="md:size-[20px] size-[16px]" /> Applied At: </span> {"  "}
            {formatDate(job.application.appliedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};
