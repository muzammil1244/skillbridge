import { ArrowLeft02Icon, Backpack01Icon, EyeIcon, GoBackward15SecIcon, Profile02Icon, TimeQuarterPassIcon, UserGroupIcon } from "hugeicons-react"; // safe and working alternative
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Application = () => {

const [data , setdata] = useState([])
const token = localStorage.getItem("token")
const getapplicationdata = async() => {


  try{
    const adata = await fetch("https://skillbridge-x62a.onrender.com/api/freelancer/applied-jobs",{
      method:"GET",
      headers:{
         "Authorization" : `Bearer ${token}`
      }
    })

    if(!adata.ok){
      console.log("server problem ",adata);
      
    }

    setdata(await adata.json())
  }catch(err){

    console.log(err)

  }

}



  useEffect(()=>{
getapplicationdata()
  },[])
  const navigate = useNavigate()
  const location = useLocation()
const themtrue = location.state?.themtrue ;
const theme = localStorage.getItem("theme")
  // Helper function to format date
  const formatDate = (dateStr) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-GB", options); // output: 25 May 2025
  };


  return (
    <div data-theme ={`${theme?"dark":""}`}  className="min-h-screen w-screen dark:bg-bg-dark bg-purple-500 p-6">
      <div className=" dark:bg-card-color dark:border-border-color bg-white rounded-xl shadow-md p-6">

        <div className="flex gap-10 items-center">

            <div className="md:flex gap-3 md:block hidden items-center">

                                      <h1 className="text-sm text-purple-500 dark:text-white font-bold"> Skill <span className="text-blue-900 dark:text-accent-color ">Bridge</span> </h1>

                        </div> 
<div  onClick={()=>{
  navigate("/freelancer/home" )
 }} className=" cursor-pointer flex items-center gap-3">
 <ArrowLeft02Icon className= "hover:scale-120 duration-200 dark:text-accent-color text-purple-500 md:size-8 size-4 font-extrabold"  />
</div>
                                </div>
         
        <h1 className="dark:text-accent-color text-orange-500 font-extrabold text-sm  md:text-2xl font-bold mb-6 text-center ">
          My Applications
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border dark:border-border-color border-gray-200 rounded-lg">
            <thead className="bg-gray-100 dark:bg-card-color  text-gray-700 text-left text-sm">
              <tr>
                <th className="p-3 border-b dark:text-secondary-text-color  md:text-sm text-[10px]   "> <Profile02Icon className="md:size-5 size-3" /> Profile Name</th>
                <th className="p-3 border-b dark:text-secondary-text-color md:text-sm text-[10px]    "><UserGroupIcon className="md:size-5 size-3"/> Employer Name</th>
                <th className="p-3 border-b dark:text-secondary-text-color md:text-sm text-[10px] "><TimeQuarterPassIcon className="md:size-5 size-3"/> Applicant Data</th>
                <th className="p-3 border-b dark:text-secondary-text-color md:text-sm text-[10px] ">Status</th>
                <th className="p-3 border-b text-center dark:text-secondary-text-color md:text-sm text-[10px] ">Review</th>
              </tr>
            </thead>
            <tbody>
              {data.map((job, index) => (
                <tr key={index} className="dark:hover:bg-border-color hover:bg-gray-50 text-sm">
                  <td className="p-3 capitalize text-[10px] md:text-sm dark:text-text-color">{job.title}</td>
                  <td className="p-3 capitalize text-[10px] md:text-sm dark:text-text-color">{job.employer.name}</td>
                   <td className="p-3 text-[10px] md:text-sm dark:text-text-color">{formatDate(job.application.appliedAt)}</td>
                  <td className="p-3 text-[10px] md:text-sm capitalize text-yellow-600  font-medium">
                    {job.application.status}
                  </td>
               
                  <td className="p-3 text-center">
                    <button className=" dark:text-accent-color cursor-pointer text-purple-600 dark:hover:text-accent-light hover:text-purple-800">
                      <EyeIcon  onClick={()=>{
navigate("/freelancer/review",{
                  state:{themtrue,job}
                })

                      }} className=" hover:scale-120 duration-200 md:size-5 size-3 inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
