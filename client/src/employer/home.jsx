import {
  Message02Icon, NodeAddIcon,
  Delete01Icon,
  UserSquareIcon, MoonEclipseIcon, NewJobIcon, PermanentJobIcon, CoinsDollarIcon, SkewIcon, File01Icon
  , Edit01Icon,
  BubbleChatOutcomeIcon,
  Time01Icon,
  SearchVisualIcon,
  MentoringIcon,
  UserStar02Icon,
  Mail01Icon,
  LockPasswordIcon,
  Image01Icon,
  Sun03Icon,
  Moon01Icon,
  Menu01Icon,
  NoteIcon,
  Chatting01Icon,
  PolicyIcon,
  Logout02Icon,
  HelpSquareIcon,
  CustomerService02Icon,
  GroupItemsIcon,
  Alert01Icon,
  AlertCircleIcon,
  LaptopIcon,
  FilterMailSquareIcon,
  ImageAdd02Icon,
  Profile02Icon,
  UserIcon,
  Cancel02Icon,
  Cancel01Icon








} from "hugeicons-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "motion/react"
import laptopimg from "../imgs/icons8-laptop-30.png"


export const Home = () => {
  const ref = useRef()
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [editetrue, editefalse] = useState(false)
  const [showthem, setthem] = useState(false)
  const [showwarn, setwarn] = useState(false)
  const [cartdata, setcartdata] = useState({})
  const [selected, setSelected] = useState("sun");
  const [showmenu, setmune] = useState(false)
  const [employertrue, employerfalse] = useState(false)
  const [getwarn, ssetwarn] = useState('')
  const [getalert, setalert] = useState(false)
  const [selectedId, setSelectedId] = useState(null);
  const [themtrue, themfalse] = useState(() => {
    const storedValue = localStorage.getItem("myValue");
    return storedValue === "true";
  })
  const options = [
    { label: "sun", icon: <Sun03Icon className="md:size-[16px] size-[12px] " /> },
    { label: "moon", icon: <Moon01Icon size={16} className="md:size-[16px] size-[12px] " /> },

  ];
    const [loader,settloader] = useState(false)

  const [getprofile, setprofile] = useState({})
  const [getformdata, setFormData] = useState({
    name: null,
    email: null,
    password: null,
    reason: null,
    profileImage: null,
  })
  const [trueshow, setshow] = useState(false)
  const toggleTheme = (mode) => {
    const isDark = mode === "moon";

    // 1. Update state
    setthem(isDark);

    // 2. Update localStorage
    localStorage.setItem("myValue", isDark.toString());

    // 3. Optional: reload page to reflect theme in other components/pages
    window.location.reload(); // Only if you're not using context
  };

  useEffect((
  ) => {
    localStorage.setItem("theme", themtrue)
  }, [themtrue])

  const [getjobarr, setjobarr] = useState([])
  const [filters, falsefilter] = useState({
    title: '',

  })

  useEffect(() => {
    employerfalse(true)
  })


  const handleToggleDescription = () => {
    setShowFullDesc((prev) => !prev);
  };


  const navigate = useNavigate()




  // handlachnag 

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...getformdata, [name]: files[0] }); // ✅ File object, not URL
    } else {
      setFormData({ ...getformdata, [name]: value });
    }
  };
  const handlefilter = (e) => {
    falsefilter({ ...filters, [e.target.name]: e.target.value });
  };


  // useEffect for function
  useEffect(() => {
    if (getprofile && Object.keys(getprofile).length > 0) {
      setFormData({
        name: getprofile.name || "",
        email: getprofile.email || "",
        reason: getprofile.roll || "",
        profileImage: null,
      });
    }
  }, [getprofile])

  useEffect(() => {
    profile()
    jobsData()
  }, [])


  // profile update
  const profile = async () => {
    const token = localStorage.getItem("token"); // ✅ yahin se lo

    if (!token) {
      return;
    }

    try {
      const data = await fetch("https://skillbridge-x62a.onrender.com/api/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // ✅ safe and direct
        },
      });

      const pdata = await data.json();
      setprofile(pdata);

    } catch (err) {
      console.log(err);
    }
  };

  // update profile
  const updateprofile = async (e) => {
    e.preventDefault()
console.log("updat fun osreked")
    const token = localStorage.getItem("token")
    const realFormData = new FormData();

    if (getformdata.name && getformdata.name.trim() !== "") {
      realFormData.append("name", getformdata.name);
    }

    if (getformdata.email && getformdata.email.trim() !== "") {
      realFormData.append("email", getformdata.email);
    }

    if (getformdata.password && getformdata.password.trim() !== "") {
      realFormData.append("password", getformdata.password);
    }

    if (getformdata.reason && getformdata.reason.trim() !== "") {
      realFormData.append("roll", getformdata.reason);
    }

    if (getformdata.profileImage) {
      realFormData.append("profileImage", getformdata.profileImage);
    }

    try {
      const update = await fetch("https://skillbridge-x62a.onrender.com/api/user/profileupdate", {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`, // 👈 Header me token bhejo
        },
        body: realFormData, // ✅ Don't stringify

      })

      // 🚀 Page refresh ho jayega

      if(data.ok){
        settloader(false)
            window.location.reload();
      }
      if(data.ok){
        settloader(false)
            window.location.reload();
      }
    
     




    } catch (err) {

      console.log("update profile problem ", err);



    }

  }


  // jobs data 

  const jobsData = async () => {
    const token = localStorage.getItem("token"); // ✅ yahin se lo

    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const jobsdata = await fetch("https://skillbridge-x62a.onrender.com/api/employer/jobs", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // 👈 Header me token bhejo
        },
      })

      const data = await jobsdata.json()
      setjobarr(data)
    } catch (err) {
      console.log(err)
    }
  }


  const filterdata = getjobarr.filter((job) => {
    const jobtitle = !filters.title || job.title.toLowerCase().includes(filters.title.toLowerCase());
    return jobtitle;
  })


  const handlelogout = () => {
    localStorage.removeItem("token")
    window.location.reload()
  }




  // delete job 

  const DeleteJob = async (id) => {
    const token = localStorage.getItem("token");
   settloader(true)


    if (getwarn.trim().toLowerCase() === getprofile.name.trim().toLowerCase()) {
      console.log("yesssssssssssss")
      try {
        await fetch(`https://skillbridge-x62a.onrender.com/api/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
settloader(false)
        //set Optional: Refresh job list or show success
        setwarn(false); // close modal
        ssetwarn("");
        window.location.reload()   // clear input
      } catch (err) {
        console.log("Delete failed:", err);
      }
    } else {    

      setalert(true);
      setTimeout(() => {
        setalert(false)
      }, 1000);// Name mismatch
    }
  };


  const handlewarn = (id) => {
    setwarn(true)
    setSelectedId(id);  // 👈 save job id for deletion
  }
  let ref2 = useRef()


  const x2 = useMotionValue(0.5);
  const y2 = useMotionValue(0.5);
  const rotateX2 = useTransform(y2, [0, 1], [15, -15]);
  const rotateY2 = useTransform(x2, [0, 1], [-15, 15]);
useEffect(()=>{
 let icon = localStorage.getItem("myValue")
  // Only if you're not using context

if(icon === "true"){
  setSelected("moon")
}else{
  setSelected("sun")
}

},[])



  const handleMouseMove2 = (e) => {


    const rect = ref2.current.getBoundingClientRect(); // card ka size/location
    const posX = (e.clientX - rect.left) / rect.width; // mouse x position card ke andar
    const posY = (e.clientY - rect.top) / rect.height; // mouse y position card ke andar
    x2.set(posX);
    y2.set(posY);
  };

  const handleMouseLeave2 = () => {
    x2.set(0.5);
    y2.set(0.5);
  };


  return (
    <div
      onClick={() => {
        if (showmenu) setmune(false)
        if (showthem) setthem(false)
      }}
      data-theme={`${themtrue ? "dark" : ""}`}
      className=" md:w-screen md:h-screen md:overflow-x-hidden bg-black md:grid h-screen md:grid-cols-8 lg:grid-cols-4 ">

      <div className={`bg-purple-500 ${trueshow == true ? " right-0 duration-100  " : " right-[-100%] duration-100 hidden  "}   absolute  md:static z-10 md:block md:overflow-x-hidden lg:overflow-visible dark:bg-bg-dark md:dark:border-r-2 md:dark:border-border-color md:col-span-3  lg:col-span-1  md:flex md:flex-col items-center`}>
        <div className=" relative flex flex-col md:ml-0    bg-purple-500 dark:bg-bg-dark md:border-r-1 dark:border-border-color  overflow-hidden   md:size-80 md:p-5">


          {
            getprofile && getprofile.profileImage ? <motion.img
              ref={ref2}
              style={{
                rotateX: rotateX2,
                rotateY: rotateY2,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleMouseMove2}
              onMouseLeave={handleMouseLeave2}
              className="h-full w-full rounded object-cover "
              src={getprofile.profileImage}
              alt="profile image"
            /> :


              <div className="flex w-full h-full justify-center items-center" role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 dark:fill-white  fill-purple-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>

          }

<Cancel01Icon onClick={()=>setshow(false)}  className=" absolute top-2 md:hidden right-3  text-gray-400" />
<div className="flex absolute bottom-3 right-3 md:hidden flex-col gap-1">
  {
              getprofile ? <h1 className="text-[20px] text-center text-white dark:text-text-color font-sans">
                {getprofile.name}
              </h1> : null
            }

                        <h1 className="text-white text-[10px] dark:text-secondary-text-color">{getprofile.email}</h1>

</div>

        </div>
        <div className="w-full h-full origin-top py-3 px-2">
          <div



            className="border-2  shadow-inner px-5 border-purple-400 dark:border-border-color dark:bg-card-color py-4 px-2 flex flex-col items-center bg-purple-500 dark:bg-blue-950 shadow-2xl shadow-purple-950 dark:shadow-shadow-color w-full h-full rounded-2xl">
            {
              getprofile ? <h1 className="text-[25px] text-center text-white dark:text-text-color font-extrabold">
                {getprofile.name}
              </h1> : null
            }
            <h1 className="text-white dark:text-secondary-text-color">{getprofile.email}</h1>

            <div className="flex w-full justify-around gap-1 items-center mt-7">
              <div className="shadow-inner shadow-purple-800 dark:shadow-shadow-color gap-2 px-3 items-center justify-around py-[3px] rounded-[10px] bg-purple-500 dark:bg-bg-dark border-2 dark:border-border-color border-purple-200 flex">
                <img
                  className="size-5"
                  src={laptopimg}
                  alt=""
                />
                <h1 className="text-gray-300 dark:text-secondary-text-color font-serif text-[12px]">
                  {getprofile ? getprofile.roll :
                    <div className=" flex size-3 justify-center items-center" role="status">
                      <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 dark:fill-white  fill-purple-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>}
                </h1>
              </div>

              <div className="shadow-inner shadow-purple-800  dark:shadow-shadow-color gap-2 px-3 items-center justify-around py-[3px] rounded-[10px] dark:bg-bg-dark bg-purple-500 dark:border-border-color border-2 border-purple-200 flex">
                <NewJobIcon color="white" size={20} />
                <h1 className="text-gray-300 dark:text-secondary-text-color font-serif text-[12px]">jobs {getjobarr.length}</h1>
              </div>
            </div>

            <button onClick={() => editefalse(!editetrue)} className="text-white dark:text-text-color  cursor-pointer px-[70px] bg-purple-600  dark:bg-accent-color border-purple-400 dark:border-accent-color dark:hover:bg-accent-light border-2 py-[3px] active:shadow-inner duration-90 rounded-[10px] shadow-purple-950 dark:shadow-shadow-color mt-10">
              edit profile
            </button>
            {
              editetrue ? <>
                <motion.form
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}

                  onSubmit={updateprofile}
                  className=" flex gap-10  flex-col mt-10">


                  <div className="flex gap-4 justify-center items-center 
 ">
                    <MentoringIcon className=" dark:text-secondary-text-color text-gray-300" />
                    <select onChange={handleChange} title="choose role" placeholder="choose user" className="border-gray-300 dark:border-border-color
  px-10 shadow-inner w-full focus:-2 outline-none dark:focus:border-border-color focus:border-purple-500 dark:shadow-shadow-color shadow-2xl shadow-purple-700 cursor-pointer
  border-2 py-[2px] rounded-xl dark:text-secondary-text-color text-gray-300" defaultValue={getprofile.roll} name="reason" required >
                      <option className="bg-purple-500 dark:bg-card-color rounded-xl
     overflow-hidden  text-gray-00" value="freelancer">freelancer</option>
                      <option className="bg-purple-500 dark:bg-card-color text-gray-300" value="employer"> employer</option>
                    </select>
                  </div>
                  <div className="flex gap-4 justify-center items-center 
 ">
                    <UserStar02Icon className=" dark:text-secondary-text-color text-gray-300" />
                    <input v placeholder="user name" defaultValue={getprofile.name} className="border-gray-300 dark:border-border-color
  w-full shadow-inner shadow-2xl focus:-2 outline-none dark:focus:border-border-color focus:border-purple-500  text-center dark:checked:border-accent-color checked:bg-purple-500 dark:shadow-shadow-color shadow-purple-700
  border-2 py-[2px] rounded-xl dark:text-secondary-text-color text-gray-300" name="name" onChange={handleChange} type="text" />
                  </div>
                  <div className="flex gap-4 justify-center items-center 
 ">
                    <Mail01Icon className=" dark:text-secondary-text-color text-gray-300" />
                    <input onChange={handleChange} defaultValue={getprofile.email} placeholder="User Email" className="border-gray-300 dark:border-border-color
  w-full shadow-inner shadow-2xl focus:-2 outline-none dark:focus:border-border-color focus:border-purple-500 text-center  checked:bg-purple-500 dark:shadow-shadow-color shadow-purple-700
  border-2 py-[2px] rounded-xl dark:text-secondary-text-color text-gray-300" name="email" type="text" />
                  </div>
                  <div className="flex gap-4 justify-center items-center 
 ">
                    <LockPasswordIcon className="text-gray-300" />
                    <input onChange={handleChange} placeholder="User Email" className="border-gray-300 dark:border-border-color
  w-full shadow-inner shadow-2xl focus:-2 outline-none dark:focus:border-border-color focus:border-purple-500  text-center checked:bg-purple-500 dark:shadow-shadow-color shadow-purple-700
  border-2 py-[2px] rounded-xl dark:text-secondary-text-color text-gray-300" name="password" type="password" />
                  </div>

                  <div className="flex gap-4 justify-center items-center 
 ">
                    <ImageAdd02Icon className="text-gray-300" />
                    <input onChange={handleChange} placeholder="image" className="border-gray-300 dark:border-border-color
  w-full shadow-inner shadow-2xl focus:-2 outline-none dark:focus:border-border-color focus:border-purple-500  text-center checked:bg-purple-500 dark:shadow-shadow-color shadow-purple-700
  border-2 py-[2px] rounded-xl dark:text-secondary-text-color text-gray-300" name="profileImage" type="file" />
                  </div>


                  <div className="flex gap-2">
                    <button onClick={() => {
                      editefalse(!editetrue)

                    }} className=" bg-red-500 cursor-pointer opacity-80  w-full rounded-xl text-gray-300 py-2">Cancle</button>
                    <button type="submit" className="bg-orange-500 cursor-pointer opacity-80  w-full rounded-xl text-gray-300 py-2"> {loader? <div className="flex w-full h-full justify-center items-center" role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 dark:fill-white  fill-purple-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>:<h2>Save</h2>}</button>

                  </div>



                </motion.form></> : ""
            }
          </div>

        </div>
      </div>

      <div className="  p-3  overflow-x-hidden md:col-span-5 lg:col-span-3 bg-white h-full dark:bg-bg-dark w-full  ">

        <section>
          <nav className="bg-white  dark:bg-bg-dark w-full  flex justify-around md:justify-between items-center  border-b-2 border-gray-600 dark:border-border-color pb-3 ">
            <div className="md:flex lg:gap-3 md:justify-between hidden md:block items-center">

                                                    <h1 className="text-sm text-purple-500 dark:text-white font-bold"> Skill <span className="text-blue-900 dark:text-accent-color ">Bridge</span> </h1>

            </div>
           <div className="lg:w-2/6 md:w-2/7 items-center flex w-2/5  overflow-hidden relative">
              <SearchVisualIcon
                size={20}
                className="absolute md:size-[20px] pl-1   size-[15px] hover:scale-110 duration-200 left-0 md:left-3 top-1/2 transform -translate-y-1/2 text-purple-500 dark:text-text-color cursor-pointer "
              />
              <input
  onChange={handlefilter}
  type="text"
  name="title"
  className="bg-gray-100 dark:bg-card-color text-center  w-full md:pl-10 md:pr-3 md:py-2 pl-2 py-1 text-xs placeholder:text-[12px] md:rounded rounded-md focus:outline-none dark:text-secondary-text-color"
  placeholder="search...."
/>

            </div>

            <div className="flex items-center bg-whit dark:bg-bg-dark w-full justify-around  md:w-1/2  md:justify-around ">





              <div onClick={() => {
                navigate("/employer/job/create", {
                  state: { themtrue }
                })
              }} className="flex cursor-pointer bg-gray-100 dark:bg-card-color lg:gap-3 md:2 shadow-md hover:bg-gray-100 dark:hover:bg-border-color duration-100 
              dark:border-border-color lg:py-[8px] md:py-[6px]  rounded-[7px] justify-center items-center px-[5px] md:px-2 lg:px-3">
                <h1 className="text-gray-800 md:px-0 px-1 md:py-0 py-1 dark:text-secondary-text-color text-[10px] md:text-sm md:font-bold">create job</h1>

                <NodeAddIcon size={20} color="gray" className="dark:text-secondary-text-color md:size-[20px] size-[12px]  " />

              </div>
              <motion.div



                onClick={
                  () => {
                    setthem(!showthem)
                    setmune(false)

                  }} tabIndex={0} className={` px-[5px] py-[5px] ${showthem ? "border-purple-500 dark:border-accent-color" : ""} cursor-pointer gap-3 relative hover:bg-gray-100 dark:text-text-color dark:hover:bg-card-color duration-100 bg-gray-100 dark:bg-card-color shadow-md  dark:border-border-color items-center md:rounded-[7px] rounded-[5px]  md:py-[8px]  md:px-3 `}>
                {
                  options.find(opt => opt.label === selected)?.icon


                }


                {showthem ?
                  <motion.div
                    initial={{
                      scale: 0
                    }}
                    animate={{
                      scale: 1
                    }}



                    className=" absolute md:top-15 top-10 z-10 md:rounded-2xl rounded-md bg-white dark:bg-card-color right-0 overflow-hidden  lg:rounded-xl shadow-lg w-fit h-fit ">
                    {options.map((opt, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          toggleTheme(opt.label);

                        }
                        }
                        className={` ${opt.label == "sun" ? "hover:bg-sky-300 duration-500 hover:text-orange-500" : "hover:bg-amber-950"} ${opt.label == "moon" ? "hover:bg-blue-950 duration-500 hover:text-sky-200" : ""} items-center gap-2 md:px-3 px-2  md:py-2 py-1 cursor-pointer`}
                      >
                        {opt.icon}
                      </div>
                    ))}

                  </motion.div> : ""
                }

              </motion.div>


              <div onClick={() => {
                setmune(!showmenu)
                setthem(false)
              }} className=" cursor-pointer relative max-w-full min-w-fit flex gap-3  hover:bg-gray-100 duration-100  dark:hover:bg-border-color rounded-md shadow-md dark:bg-card-color  bg-gray-100 dark:border-border-color md:py-[8px] px-[5px] py-[5px] md:rounded-[7px] md:px-3">

                <Menu01Icon className="dark:text-text-color md:size-[16px] size-[12px] " color="black" />
                {
                  showmenu ? <motion.div

                    initial={{
                      scale: 0,

                    }}
                    animate={{
                      scale: 1
                    }}

                    className="absolute md:w-45 w-35  right-10 mt-2 will-change-scroll top-16 flex flex-col gap-2 px-3 py-2 bg-white dark:bg-card-color    rounded-md shadow-lg transition-opacity duration-300 z-10">


                    <div onClick={() => {
                      const senderId = getprofile._id
                      navigate("/chatapp", {

                        state: { themtrue, employertrue, senderId }

                      })
                    }} className="flex relative group gap-2 items-center cursor-pointer ">
                      <Chatting01Icon className="group-hover:text-purple-500 dark:group-hover:text-accent-color size-[17px] md:size-[25px] text-gray-700 dark:text-secondary-text-color" />
                      <h1 className="group-hover:text-purple-500 dark:group-hover:text-accent-color text-[13px] md:text-[15px] text-gray-700 dark:text-secondary-text-color" >Start chat</h1>
                    </div>
                    <div className="relative group flex gap-2 items-center cursor-pointer">
                      <PolicyIcon className="group-hover:text-purple-500 dark:group-hover:text-accent-color size-[17px] md:size-[25px]  text-gray-700 dark:text-secondary-text-color" />
                      <h1 className="group-hover:text-purple-500 dark:group-hover:text-accent-color text-[13px] md:text-[15px] text-gray-700 dark:text-secondary-text-color" >Our Policy</h1>
                    </div>

                    <div onClick={() => {
                      setshow(true)
                    }} className=" md:hidden relative group flex gap-2 items-center cursor-pointer">

                      <UserIcon className="group-hover:text-purple-500 dark:group-hover:text-accent-color size-[17px] md:size-[25px]  text-gray-700 dark:text-secondary-text-color" />
                      <h1 className="group-hover:text-purple-500 dark:group-hover:text-accent-color text-[13px] md:text-[15px] text-gray-700 dark:text-secondary-text-color" >User Pfrofile</h1>

                    </div>
                    <div onClick={handlelogout} className="relative group flex gap-2 items-center cursor-pointer">
                      <Logout02Icon className="group-hover:text-purple-500 size-[17px] md:size-[25px] dark:group-hover:text-accent-color  text-gray-700 dark:text-secondary-text-color" />
                      <h1 className="group-hover:text-purple-500 text-[13px] md:text-[15px] dark:group-hover:text-accent-color  text-gray-700 dark:text-secondary-text-color" >Log out</h1>
                    </div>
                    <div className="relative group flex gap-2 items-center cursor-pointer">
                      <HelpSquareIcon className="group-hover:text-purple-500 size-[17px] md:size-[25px] dark:group-hover:text-accent-color  text-[15px] text-gray-700 dark:text-secondary-text-color" />
                      <h1 className="group-hover:text-purple-500 text-[13px] md:text-[15px]  dark:group-hover:text-accent-color  text-gray-700 dark:text-secondary-text-color" >Help</h1>
                    </div>
                    <div className="relative group flex gap-2 items-center cursor-pointer">
                      <CustomerService02Icon className="group-hover:text-purple-500 dark:group-hover:text-accent-color size-[17px] md:size-[25px] text-gray-700 dark:text-secondary-text-color" />
                      <h1 className="group-hover:text-purple-500 text-[10px] md:text-[15px]  dark:group-hover:text-accent-color  text-gray-700 dark:text-secondary-text-color" > +91 8446411038</h1>
                    </div>
                  </motion.div> : ""
                }


              </div>
            </div>


          </nav>


        </section>



        {getjobarr.length > 0 ?
          filterdata.map((element) => {
            return <div className=" relative hover:scale-102 md:w-fit gap-5 overflow-x-hidden  duration-300 lg:w-full md:max-w-xl md:mx-auto px-3 md:px-7 py-3 md:py-6 bg-white dark:bg-card-color rounded-2xl shadow-xl border border-purple-200 dark:border-border-color mx-5 my-7 md:my-10">

              <div className="grid grid-cols-4">
                <h1 className="md:text-2xl overflow-hidden col-span-3  font-bold text-orange-500 mb-3 flex items-center gap-2">
                  {element.title}
                </h1>
                <img className="col-span-1 md:size-15 size-7 object-cover rounded-full" src={element.image} alt="" />
              </div>

              <p
                className={`text-gray-700 dark:text-text-color text-[10px] md:text-sm md:mb-4 mb-2 cursor-pointer transition-all w-full duration-300 ${showFullDesc ? "whitespace-pre-wrap break-words" : "truncate"
                  }`}
                onClick={handleToggleDescription}
                title="Click to toggle full description"
                style={{
                  // ✅ Prevent horizontal overflow
                }}
              >
                {element.description}
              </p>

              <div className="flex flex-wrap gap-3 md:gap-4 text-sm text-gray-800 mb-3 md:mb-5">
                <div className="flex dark:text-secondary-text-color items-center gap-2">
                  <PermanentJobIcon className="size-[15px] md:size-[25px]" />
                  <span className="text-[10px] md:text-sm ">{element.jobtype}</span>
                </div>
                <div className="flex dark:text-secondary-text-color items-center gap-2">
                  <CoinsDollarIcon className="size-[15px] md:size-[25px]" />
                  <span className="text-[10px] md:text-sm">{element.budget}</span>
                </div>
                <div className="flex dark:text-secondary-text-color wrap-break-word items-center gap-2">
                  <SkewIcon className="size-[15px] md:size-[25px]" />
                  <p
                    className={`text-gray-800 text-[10px] md:text-sm  wrap-break-word dark:text-secondary-text-color  cursor-pointer  transition-all duration-300 ${showAllSkills ? "" : "truncate"
                      }`}
                    onClick={() => setShowAllSkills(!showAllSkills)}
                    title="Click to show all skills"
                  >
                    <span className="font-semibold sw  dark:text-text-color text-[10px] md:text-sm text-gray-600">Skills:</span>{" "}
                    {element.skill.join(", ")}
                  </p>
                </div>
                <div className="flex dark:text-secondary-text-color  gap-4">
                  <Time01Icon className="size-[15px] md:size-[25px]" />
                  <p className="text-[10px] md:text-sm dark:text-secondary-text-color text-gray-500">
                    Posted on:{" "}
                    {new Date(element.createdAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>

                  {element.active ? <h1 className="text-[10px] md:text-sm">Active hringe</h1> : ""}

                </div>
              </div>

              <div className="flex justify-between items-center md:pt-4 pt-2 border-t border-gray-200">
                <div className="flex gap-4 md:gap-7">

                  <button onClick={() => {

                    navigate("/employer/job/update", {
                      state: { themtrue, element }
                    })
                  }} className="flex text-[10px] md:text-sm cursor-pointer bg-red-300 rounded-md md:rounded-2xl px-1 py-2 md:px-3 md:py-4 items-center md:gap-1 text-red-500 hover:text-red-700 font-medium">
                    <Edit01Icon className="size-[15px] md:size-[25px]" />
                    Update
                  </button>
                </div>
                <div className="flex items-center gap-7">
                  <button onClick={() => handlewarn(element._id)} className="flex cursor-pointer text-[10px]  md:text-sm  bg-purple-300 md:h-full h-fit md:py-4 py-2  rounded-md md:rounded-2xl px-1 md:px-3 items-center gap-1 text-purple-600 hover:text-purple-800 font-medium">


                    <Delete01Icon className="size-[15px] md:size-[25px]" />

                    Delete
                  </button>
                  <button onClick={() => navigate("/employer/job/application", {
                    state: { themtrue, jobid: element._id, senderId: getprofile._id }
                  })} className="bg-orange-500 cursor-pointer  hover:bg-orange-600 text-white font-semibold md:px-4 px-[7px] py-[3.5px]   md:py-1 rounded-full text-[10px]  md:text-sm">
                    <File01Icon className="size-[10px] md:size-[25px]" />
                    Applications
                  </button>
                </div>
              </div>
            </div>
          }) :<div className="w-full dark:bg-card-color dark:border-border-color hover:scale-101 duration-500 flex justify-center h-fill bg-purple-200 rounded-2xl  shadow-purple-300 shadow-lg mt-10 self-center ">

<h1 className=" md:text-sm dark:text-secondary-text-color  py-10 md:px-10 text-sm text-center    ">You haven’t created any jobs yet.
If you wish to post a job, you can easily create one using the “Create Job” button.</h1>

          </div>
        }


      </div>

      {
        showwarn ? <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className=" flex w-2/3 z-11 shadow-xl rounded-2xl dark:border-card-color  border-gray-200 border-2 self-center place-self-center absolute top-40 md:top-20 lg:top-40  md:w-100 h-50 md:h-70 lg:w-1/2 lg:h-1/2 bg-white dark:bg-border-color">
          {
            cartdata ? <div className=" flex flex-col gap-3 w-full  h-full p-3">
              <div className="flex gap-3 text-[12px] md:text-lg justify-center items-center text-orange-500 dark:text-accent-color">
                <Alert01Icon className=" dark:text-accent-color md:size-[20px] size-[12px] text-orange-500" />
                <h1>you are gonna delete this job</h1>
              </div>

              <div className="px-5">
                <p className="dark:text-accent-color text-[10px] md:text-[15px]" >Are You sure to delete this job if yes then write  "{getprofile.name}"</p>
              </div>
              <div className="px-5  gap-3 items-center text-orange-500 dark:text-accent-color">

                <div className="flex items-center justify-center gap-2">
                  <AlertCircleIcon className="md:size-[20px] size-[12px] " />
                  <input type="text" name="name" onChange={(e) => ssetwarn(e.target.value)} className="w-full py-1 px-2 text-[12px] md:text-sm   md:py-2 text-center border-2 border-orange-500 dark:border-card-color rounded-2xl" placeholder="write job name assetist" />
                </div>

                {getalert ? <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-red-600 origin-center text-center md:text-sm text-[10px]  ">! somthing wronged </motion.p> : ""}
              </div>
              <div className=" flex gap-3 justify-end md:mt-10">
                <button onClick={() => DeleteJob(selectedId)} className=" bg-red-400 md:px-4 px-2  text-[12px] md:py-3 md:text-sm rounded-2xl text-white cursor-pointer hover:bg-red-500 duration-200 "> {loader? <div className="flex w-full h-full justify-center items-center" role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 dark:fill-white  fill-purple-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>:<h2>Delete</h2>}</button>

                <button onClick={() => setwarn(false)} className=" bg-orange-400 md:not-only-of-type:px-4 md:py-3 text-[12px] md:text-sm py-2 px-2 rounded-2xl text-white cursor-pointer hover:bg-orange-500 duration-200 ">Cancel</button>

              </div>

            </div> : ""
          }
        </motion.div> : ""
      }


    </div>
  )
}