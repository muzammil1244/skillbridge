import {
  Message02Icon,
  NodeAddIcon,
  Delete01Icon,
  UserSquareIcon,
  MoonEclipseIcon,
  NewJobIcon,
  PermanentJobIcon,
  CoinsDollarIcon,
  SkewIcon,
  File01Icon,
  Edit01Icon,
  BubbleChatOutcomeIcon,
  Time01Icon,
  SearchVisualIcon,
  Home02Icon,
  Dollar01Icon,
  DollarCircleIcon,
  MentoringIcon,
  UserStar02Icon,
  Mail01Icon,
  Passport01Icon,
  LockPasswordIcon,
  Image01Icon,
  FilterAddIcon,
  JobSearchIcon,
  Location01Icon,
  Search01Icon,
  Search02Icon,
  Cancel02Icon,
  Menu01Icon,
  NoteIcon,
  Chatting01Icon,
  PolicyIcon,
  Logout01Icon,
  Logout02Icon,
  HelpSquareIcon,
  CustomerService02Icon,
  Sun03Icon,
  Moon01Icon,
  JobLinkIcon,
  NoteEditIcon,
  Image02Icon,
  ImageUpload01Icon,
  ImageAdd01Icon,
  ImageAdd02Icon,
  Edit02Icon,
  PlusSignIcon,
  StarIcon,
  Building02Icon,
  UserIcon,
  Cancel01Icon
} from "hugeicons-react";
import { useEffect, useRef, useState } from "react";
import { useFetcher, useLocation, useNavigate } from "react-router-dom";
import { animate, motion,AnimatePresence , useMotionValue , useTransform  } from "motion/react"
import { Nottification } from "../components/notify";
import { jwtDecode } from "jwt-decode";
import laptopimg from "../imgs/icons8-laptop-30.png"

export const Homee = () => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showpage, getpage] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editetrue, editefalse] = useState(false)
const [filtertrue, setFiltertrue] = useState(false)
  const [menutrue, menufalse] = useState(false)
  const [showthem, setthem] = useState(false)
  const [reviewtrue, reviewfalse] = useState(false)
  const [themtrue, themfalse] = useState(() => {
    const storedValue = localStorage.getItem("myValue");
    return storedValue === "true";
  })
  const [truedata, falsedata] = useState([])
  const [gettoke, settoken] = useState("")
  const [selected, setSelected] = useState("sun");
  const [getprofile, setprofile] = useState({})
  const [getapplicationdata, setapplication] = useState([])
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [getformdata, setFormData] = useState({
    name:null,
    email: null,
    password:null,
    reason:null,
    profileImage: null,
  })

  const [ showprofile ,setshowprofile]  =useState(false)
  const options = [
    { label: "sun", icon: <Sun03Icon className="dark:text-secondary-text-color size-[13px] md:size-[16px]"  /> },
    { label: "moon", icon: <Moon01Icon className="dark:text-secondary-text-color size-[13px] md:size-[16px] "  /> },

  ];
  const [showAll, setShowAll] = useState(false);

  const [filters, falsefilter] = useState({
    title: '',
    location: '',
    minSalary: ''
  })

  const [getreviewdata, setreviewdata] = useState({
    rate: null,
    Comment: ""
  });

  const [getreview, setreview] = useState([])
let reviewdata = showAll ? getreview : getreview.slice(0, 4);
console.log("reivew data",reviewdata)
  useEffect(() => {
    localStorage.setItem("myValue", themtrue);
  }, [themtrue]);

  const Reviewfun = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("https://skillbridge-x62a.onrender.com/review/review", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        console.log("Server error:", response.status);
        return;
      }

      const data = await response.json();
      setreview(data);
    } catch (err) {
      console.log("review err", err);
    }
  };

useEffect(()=>{
 let icon = localStorage.getItem("myValue")
  // Only if you're not using context
console.log("is true or false",icon)

if(icon === "true"){
  setSelected("moon")
}else{
  setSelected("sun")
}

},[])

  const toggleTheme = (mode) => {
  const isDark = mode === "moon";

  // 1. Update state
  setthem(isDark);

  // 2. Update localStorage
  localStorage.setItem("myValue", isDark.toString());

  // 3. Optional: reload page to reflect theme in other components/pages
  window.location.reload();
  
 

};

  const handlereview = (e) => {
    const { name, value } = e.target;
    setreviewdata(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const PostReview = async () => {
    const token = localStorage.getItem("token");

    console.log("Sending review data:", getreviewdata); // ✅ Debug log

    try {
      const res = await fetch("https://skillbridge-x62a.onrender.com/review/add/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ MISSING EARLIER
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(getreviewdata) // ✅ JSON required
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error("Backend error:", errData); // ✅ Server error message
      } else {
        const result = await res.json();
        console.log("Review submitted:", result);
      }
    } catch (err) {
      console.log("Review post error", err);
    }
  };




  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...getformdata, [name]: files[0] }); // ✅ File object, not URL
    } else {
      setFormData({ ...getformdata, [name]: value });
    }
  };

  const handleToggleDescription = () => {
    setShowFullDesc((prev) => !prev);
  };

  useEffect(() => {

    const jobsdata = async () => {
      try {

        const token = localStorage.getItem("token");
        settoken(token)

        console.log("token type", typeof (token))
        // 👈 Token nikaalo

        const jobdata = await fetch("https://skillbridge-x62a.onrender.com/api/freelancer/jobs", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // 👈 Header me token bhejo
          },
        })
        const data = await jobdata.json()

        falsedata(data)




      } catch (err) {
        console.log(err)
      }
    }

    const data = localStorage.getItem("token")
    const decoded = jwtDecode(data)
    if (decoded.roll == "employer") {

      navigate("/login")

    } else {
      console.log("not a employer", decoded.roll);

    }

    jobsdata()
    profile()
    applicationdata()
  }, [])
  useEffect(() => {
    Reviewfun()
  }, [])
  const tokenremove = () => {

    localStorage.removeItem("token")

    navigate("/login")

  }

  const profile = async () => {
    const token = localStorage.getItem("token"); // ✅ yahin se lo

    if (!token) {
      console.log("No token found");
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
      console.log(pdata);
      setprofile(pdata);

    } catch (err) {
      console.log(err);
    }
  };


  console.log("prfoile data", getprofile)
  useEffect(() => {
    if (location.state?.truenot) {
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
        // clear state so it doesn't repeat on refresh
        navigate(location.pathname, { replace: true });
      }, 3000);
    }
  }, [location, navigate]);

  useEffect(() => {
    if (getprofile && Object.keys(getprofile).length > 0) {
      setFormData({
        name: getprofile.name || "",
        email: getprofile.email || "",
        reason: getprofile.roll || "",
        profileImage: null,
      });
    }
  }, [getprofile]);
  const updateprofile = async (e) => {
    e.preventDefault()

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

      const decoded = jwtDecode(token);
      setTimeout(() => {
        window.location.reload();
      }, 1000);




    } catch (err) {

      console.log("update profile problem ", err);



    }

  }

  console.log("filterfalse or treue",filtertrue)
  const applicationdata = async () => {
    const token = localStorage.getItem("token"); // ✅ yahin se lo

    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const applicantdata = await fetch("https://skillbridge-x62a.onrender.com/api/freelancer/applied-jobs", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // 👈 Header me token bhejo
        },
      })

      const data = await applicantdata.json()
      setapplication(data)

    } catch (err) {
      console.log(err)
    }
  }



  useEffect((
  ) => {
    localStorage.setItem("theme", themtrue)
  }, [themtrue])


  const handlefilter = (e) => {
    falsefilter({ ...filters, [e.target.name]: e.target.value });
  };


  const filterdata = truedata.filter((job) => {
    const jobtitle = !filters.title || job.title.toLowerCase().includes(filters.title.toLowerCase());
    const joblocation = !filters.location || job.jobtype?.toLowerCase().includes(filters.location.toLowerCase());
    const jobsalary = !filters.minSalary || job.budget >= parseInt(filters.minSalary);

    return jobtitle && joblocation && jobsalary
  })

let ref2 = useRef()


const x2 = useMotionValue(0.5);
const y2 = useMotionValue(0.5);
const rotateX2 = useTransform(y2, [0, 1], [15, -15]);
const rotateY2 = useTransform(x2, [0, 1], [-15, 15]);




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
    <div onClick={() => {
      
    }}
      data-theme={`${themtrue ? "dark" : ""}`}

      className="md:w-screen md:h-screen   overflow-x-hidden bg-white md:grid md:grid-cols-8  lg:grid-cols-4">
      {/* Sidebar */}
      
     


      <div className={`bg-purple-500   ${showprofile == true?" right-0 duration-100  ":" right-[-100%] duration-100 hidden  "}  absolute  md:static z-10 md:block md:overflow-x-hidden lg:overflow-visible dark:bg-bg-dark md:dark:border-r-2 md:dark:border-border-color md:col-span-3  lg:col-span-1  md:flex md:flex-col items-center`}>
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
  className="h-full w-full roundedobject-cover"
  src={`https://skillbridge-x62a.onrender.com/uploads/${getprofile.profileImage}`}
  alt="profile image"
/>

 :


              <div className="flex w-full h-full justify-center items-center" role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 dark:fill-white  fill-purple-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>

          }



  <Cancel01Icon onClick={()=>setshowprofile(false)} className=" absolute top-2 right-5 text-gray-500 md:hidden "/>

<div className="flex absolute bottom-3 right-3 md:hidden flex-col gap-1">
  {
              getprofile ? <h1 className="text-[20px] text-center text-white dark:text-text-color font-sans">
                {getprofile.name}
              </h1> : null
            }

                        <h1 className="text-white text-[10px] dark:text-secondary-text-color">{getprofile.email}</h1>

</div>

        </div>
        <div className="w-full  h-full p-3">
          <div  
          
 
 className="border-2  shadow-inner px-5 border-purple-400 dark:border-border-color py-4 px-2 flex flex-col items-center bg-purple-500 dark:bg-card-color shadow-2xl shadow-purple-950 dark:shadow-shadow-color w-full  md:h-full rounded-2xl">
            {
              getprofile ? <h1 className="text-[25px] text-center text-white dark:text-text-color font-extrabold">
                {getprofile.name}
              </h1> : null
            }

            <h1 className="text-white dark:text-secondary-text-color">{getprofile.email}</h1>



            <div className="flex w-full  justify-around gap-1 items-center mt-7">
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
                <h1 className="text-gray-300 dark:text-secondary-text-color font-serif text-[12px]">Applications {getapplicationdata && getapplicationdata.length ? getapplicationdata.length : <div className=" flex size-3 justify-center items-center" role="status">
                  <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 dark:fill-white  fill-purple-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
                }</h1>
              </div>
            </div>

           <button onClick={() => editefalse(!editetrue)} className="text-white dark:text-text-color  cursor-pointer px-[68px] bg-purple-600  dark:bg-accent-color border-purple-400 dark:border-accent-color dark:hover:bg-accent-light border-2 py-[3px] active:shadow-inner duration-90 rounded-[10px] shadow-purple-950 dark:shadow-shadow-color mt-10">
              edit profile
            </button>
            {
              editetrue ? <>
                <motion.form
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}

                  onSubmit={updateprofile}
                  className=" flex gap-10   flex-col mt-10">


                  <div className="flex gap-2 sm:gap-4 justify-center items-center w-full">
  <MentoringIcon className="dark:text-secondary-text-color text-gray-300 text-sm sm:text-base" />
  
  <select
    onChange={handleChange}
    title="choose role"
    placeholder="choose user"
    defaultValue={getprofile.roll}
    name="reason"
    required
    className="border-gray-300 dark:border-border-color
      px-4 sm:px-10 py-[4px]
      shadow-inner shadow-sm sm:shadow-2xl
      w-full sm:w-full
      focus:outline-none dark:focus:border-border-color focus:border-purple-500
      dark:shadow-shadow-color shadow-purple-700
      border-2 rounded-xl
      dark:text-secondary-text-color text-gray-300
      text-sm sm:text-base"
  >
    <option
      className="bg-purple-500 dark:bg-card-color rounded-xl text-gray-300"
      value="freelancer"
    >
      freelancer
    </option>
    <option
      className="bg-purple-500 dark:bg-card-color text-gray-300"
      value="employer"
    >
      employer
    </option>
  </select>
</div>

                  <div className="flex gap-4 justify-center items-center 
 ">
                    <UserStar02Icon className=" dark:text-secondary-text-color text-gray-300" />
                    <input v placeholder="user name" defaultValue={getprofile.name} className="border-gray-300 dark:border-border-color
  w-full shadow-inner shadow-2xl focus:-2 outline-none dark:focus:border-border-color focus:border-purple-500  text-center dark:checked:border-accent-color checked:bg-purple-500 dark:shadow-shadow-color shadow-purple-700
  border-2 py-[2px] rounded-xl dark:text-secondary-text-color text-gray-300" name="name" onChange={handleChange} type="text" required />
                  </div>
                  <div className="flex gap-4 justify-center items-center 
 ">
                    <Mail01Icon className=" dark:text-secondary-text-color text-gray-300" />
                    <input onChange={handleChange} defaultValue={getprofile.email} placeholder="User Email" className="border-gray-300 dark:border-border-color
  w-full shadow-inner shadow-2xl focus:-2 outline-none dark:focus:border-border-color focus:border-purple-500 text-center  checked:bg-purple-500 dark:shadow-shadow-color shadow-purple-700
  border-2 py-[2px] rounded-xl dark:text-secondary-text-color text-gray-300" name="email" type="text" required />
                  </div>
                  <div className="flex gap-4 justify-center items-center 
 ">
                    <LockPasswordIcon className="text-gray-300" />
                    <input onChange={handleChange} placeholder="User Password" className="border-gray-300 dark:border-border-color
  w-full shadow-inner shadow-2xl focus:-2 outline-none dark:focus:border-border-color focus:border-purple-500  text-center checked:bg-purple-500 dark:shadow-shadow-color shadow-purple-700
  border-2 py-[2px] rounded-xl dark:text-secondary-text-color text-gray-300" name="password" type="password"  />
                  </div>

                  <div className="flex gap-4 justify-center items-center 
 ">
                    <ImageAdd02Icon className="text-gray-300" />
                    <input onChange={handleChange} placeholder="User Email" className="border-gray-300 dark:border-border-color
  w-full shadow-inner shadow-2xl focus:-2 outline-none dark:focus:border-border-color focus:border-purple-500  text-center checked:bg-purple-500 dark:shadow-shadow-color shadow-purple-700
  border-2 py-[2px] rounded-xl dark:text-secondary-text-color text-gray-300" name="profileImage" type="file" required />
                  </div>


                  <div className="flex gap-2">
                    <button onClick={() => {
                      editefalse(!editetrue)

                    }} className=" bg-red-500 cursor-pointer opacity-80  w-full rounded-xl text-gray-300 py-2">Cancle</button>
                    <button type="submit" className="bg-orange-500 cursor-pointer opacity-80  w-full rounded-xl text-gray-300 py-2">Save</button>

                  </div>



                </motion.form></> : ""
            }
          </div>

        </div>

      </div>

      {/* Main Content */}
      <div className="p-3 relative overflow-y-scroll lg:col-span-3  md:col-span-5 dark:bg-bg-dark bg-white w-full">
        <nav className="dark:bg-bg-dark  bg-white w-full flex justify-around items-center border-b-2 dark:border-border-color border-gray-600 pb-3">
          <div className="md:flex   lg:gap-3 md:justify-between hidden md:block items-center">

                                                    <h1 className="text-sm text-purple-500 dark:text-white font-bold"> Skill <span className="text-blue-900 dark:text-accent-color ">Bridge</span> </h1>

            </div>
          <div className="lg:w-2/6 md:w-2/7 items-center flex w-2/7  overflow-hidden relative">
              <SearchVisualIcon
                size={20}
                className="absolute md:size-[20px] pl-1   size-[15px] hover:scale-110 duration-200 left-0 md:left-3 top-1/2 transform -translate-y-1/2 text-purple-500 dark:text-text-color cursor-pointer "
              />
              <input
  onChange={handlefilter}
  type="text"
  name="title"
  className="bg-gray-100 dark:bg-card-color text-center w-full md:pl-10 md:pr-3 md:py-2 pl-2 py-[1px] text-xs placeholder:text-[12px] md:rounded rounded-md focus:outline-none dark:text-secondary-text-color"
  placeholder="search........"
/>

            </div>
          <div className="flex items-center  dark:bg-bg-dark bg-white w-2/3 justify-around">
            <div onClick={() => {

              menufalse(false)
              setthem(false)
            }} className={`${filtertrue ? "border-purple-500" : null} relative dark:bg-card-color flex gap-1  text-sm text-[15px] items-center cursor-pointer lg:gap-3 md:gap-2  dark:hover:bg-border-color duration-100 bg-gray-100 shadow-sm md:py-[6px]  lg:py-[8px] rounded-[7px] py-1 px-1`}>
              <h1 onClick={()=>           setFiltertrue(true)} className=" dark:text-secondary-text-color text-[10px] md:text-sm text-gray-800 font-bold">Filter</h1>
              <FilterAddIcon onClick={()=>           setFiltertrue(true)}   className="md:size-[20px] size-[14px] dark:text-gray-300 text-gray-800" />
                    {filtertrue ? 
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    className="dark:bg-card-color bg-white z-10 md:absolute fixed top-20 md:right-10 right-8 flex flex-col gap-4 w-72 border-2 border-gray-300 dark:border-border-color rounded-2xl p-5 shadow-xl"
  >
    {/* Job Title */}
    <div className="flex items-center gap-2">
      <JobSearchIcon className="w-5 h-5 text-purple-600 dark:text-secondary-text-color" />
      <input
        onChange={handlefilter}
        type="text"
        name="title"
        placeholder="Search Job Title..."
        className="flex-1 py-1 px-2 dark:bg-secondary-text-color bg-gray-100 dark:text-card-color text-sm rounded-lg border border-gray-300 dark:border-border-color focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
    </div>

    {/* Location */}
    <div className="flex items-center gap-2">
      <Location01Icon className="w-5 h-5 text-purple-600 dark:text-secondary-text-color" />
      <select
        name="location"
        onChange={handlefilter}
        className="flex-1 py-1 px-2 text-sm rounded-lg border border-gray-300 dark:border-border-color dark:bg-secondary-text-color bg-gray-100 dark:text-card-color focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        <option value="">Select Location</option>
        <option value="work from Home">Work from Home</option>
        <option value="work from office">Work from Office</option>
      </select>
    </div>

    {/* Salary Range */}
    <div className="space-y-1">
      <label className="block text-sm font-semibold text-gray-700 dark:text-secondary-text-color">
        Salary Range (₹)
      </label>
      <div className="flex items-center justify-between gap-2">
        <input
          type="number"
          name="minSalary"
          placeholder="Min"
          min={0}
          value={filters.minSalary || ""}
          onChange={handlefilter}
          className="w-full border rounded-lg px-2 py-1 text-sm dark:bg-secondary-text-color dark:text-card-color border-gray-300 dark:border-border-color"
        />
        
      </div>
      {/* Range Slider for visual control */}
      <input
        type="range"
        name="minSalary"
        min={0}
        max={100000}
        value={filters.minSalary}
        onChange={handlefilter}
        className="w-full mt-2 accent-purple-500 dark:accent-accent-color"
      />
      <p className="text-xs text-gray-500 dark:text-secondary-text-color">
        Selected minimum: ₹{filters.minSalary || 0}
      </p>
    </div>

    {/* Buttons */}
   <div className="flex justify-between mt-4">
 
</div>
 <div className="flex justify-between mt-4">
  <div
    onClick={() => {
      falsefilter({
        title: '',
        location: '',
        minSalary: ''
      });
      setFiltertrue(false); // ✅ Close the filter box
    }}
    className="flex items-center gap-1 text-gray-700 dark:text-white bg-white dark:bg-transparent border border-orange-500 hover:bg-orange-100 dark:hover:bg-orange-900 rounded-xl px-4 py-1 text-sm"
  >
    <Cancel02Icon className="w-4 h-4" /> Cancel
  </div>
</div>


  </motion.div>
:null}
            </div>
    

            <div onClick={() => {
              setthem(!showthem)
              menufalse(false)
              setFiltertrue(false)
            }} tabIndex={0} className={` p-[5px] ${showthem ? "dark:border-accent-color border-purple-500" : ""} cursor-pointer  bg-gray-100 shadow-sm dark:bg-card-color dark:hover:bg-border-color hover:bg-gray-100 duration-100  items-center rounded md:rounded-[7px]  md:py-[9px]  md:px-3 `}>
              {
                options.find(opt => opt.label === selected)?.icon
              }
            </div>
            {showthem ?
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className=" absolute top-15 z-10 dark:bg-card-color bg-white overflow-hidden  rounded-xl shadow-lg w-fit h-fit ">
                {options.map((opt, index) => (
                  <div
                    key={index}
                    onClick={() => {
setthem(false)
    toggleTheme(opt.label);
                      

                    }

                    }
                    className={` ${opt.label == "sun" ? "hover:bg-sky-300 duration-500  hover:text-orange-500" : "hover:bg-amber-950"} ${opt.label == "moon" ? "hover:bg-blue-950 duration-500 hover:text-sky-200" : ""} items-center gap-2 px-3 py-2  cursor-pointer`}
                  >
                    {opt.icon}
                  </div>
                ))}

              </motion.div> : ""
            }

            <div
              tabIndex={0}

              onClick={() => {
                menufalse(!menutrue)
                setthem(false)
                filterfalse(false)
              }} className={` p-[5px] ${menutrue ? "border-purple-500" : null} flex relative cursor-pointer dark:bg-card-color     md:gap-3 bg-gray-100 shadow-sm   dark:hover:bg-border-color hover:bg-gray-100 duration-100 dark:border-border-color  md:py-[7px] rounded md:rounded-[7px] md:px-3`}>
              <Menu01Icon className="size-[14px] dark:text-gray-300 md:size-[18px]" />



            </div>
            {menutrue ?
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}

                className="absolute  right-10 mt-2 will-change-scroll top-16 flex flex-col gap-2 px-3 py-2 bg-white dark:bg-card-color   rounded-md shadow-lg transition-opacity duration-300 z-15 overflow-hidden">

                <div onClick={() => {
                  navigate("/freelancer/application", {
                    state: { themtrue }
                  })
                }} className="flex gap-2 relative group items-center cursor-pointer">
                  <NoteIcon className="text-[15px] dark:group-hover:text-accent-color group-hover:text-purple-500 dark:text-secondary-text-color text-gray-700" />
                  <h1 className="text-[15px] dark:group-hover:text-accent-color group-hover:text-purple-500 dark:text-secondary-text-color text-gray-700" >your Application</h1>
                </div>
                <div onClick={() => {
                  const senderId = getprofile._id
                  
                  navigate("/chatapp", {
                    state: { themtrue,senderId }
                  })
                }} className="flex relative group gap-2 items-center cursor-pointer ">
                  <Chatting01Icon className="dark:group-hover:text-accent-color group-hover:text-purple-500 dark:text-secondary-text-color text-[15px] text-gray-700" />
                  <h1 className="dark:group-hover:text-accent-color group-hover:text-purple-500 dark:text-secondary-text-color text-[15px] text-gray-700" >Start chat</h1>
                </div>
                <div onClick={() => {
                setshowprofile(true)
                menufalse(false)

                }} className="flex relative group gap-2 items-center md:hidden cursor-pointer ">
                  <UserIcon className="dark:group-hover:text-accent-color group-hover:text-purple-500 dark:text-secondary-text-color text-[15px] text-gray-700" />
                  <h1 className="dark:group-hover:text-accent-color group-hover:text-purple-500 dark:text-secondary-text-color text-[15px] text-gray-700" >User Profile</h1>
                </div>
                <div className="relative group flex gap-2 items-center cursor-pointer">
                  <PolicyIcon className="dark:group-hover:text-accent-color group-hover:text-purple-500 dark:text-secondary-text-color text-[15px] text-gray-700" />
                  <h1 className="dark:group-hover:text-accent-color group-hover:text-purple-500 dark:text-secondary-text-color text-[15px] text-gray-700" >Our Policy</h1>
                </div>
                <div onClick={() => {
                  navigate("/freelancer/resume", {
                    state: { themtrue,getprofile }
                  })
                }} className="relative group flex gap-2 items-center cursor-pointer">
                  <NoteEditIcon className="dark:group-hover:text-accent-color group-hover:text-purple-500 dark:text-secondary-text-color text-[15px] text-gray-700" />
                  <h1 className="dark:group-hover:text-accent-color group-hover:text-purple-500 dark:text-secondary-text-color text-[15px] text-gray-700" >Edite Resume</h1>

                </div>
                <div onClick={() => {
                  tokenremove()
                }} className="relative group flex gap-2 items-center cursor-pointer">
                  <Logout02Icon className="dark:group-hover:text-accent-color group-hover:text-purple-500 dark:text-secondary-text-color text-[15px] text-gray-700" />
                  <h1 className="dark:group-hover:text-accent-color group-hover:text-purple-500 dark:text-secondary-text-color text-[15px] text-gray-700" >Log out</h1>
                </div>
                <div className="relative group flex gap-2 items-center cursor-pointer">
                  <HelpSquareIcon className="dark:group-hover:text-accent-color group-hover:text-purple-500 dark:text-secondary-text-color text-[15px] text-gray-700" />
                  <h1 className="dark:group-hover:text-accent-color group-hover:text-purple-500 text-[15px] dark:text-secondary-text-color text-gray-700" >Help</h1>
                </div>
                <div className="relative group flex gap-2 items-center cursor-pointer">
                  <CustomerService02Icon className="dark:group-hover:text-accent-color group-hover:text-purple-500 dark:text-secondary-text-color text-[15px] text-gray-700" />
                  <h1 className="dark:group-hover:text-accent-color group-hover:text-purple-500 text-[15px] dark:text-secondary-text-color text-gray-700" > +91 844641####</h1>
                </div>
              </motion.div> : ""
            }



          </div>
        </nav>

        {/* Job Cards */}


        {truedata && truedata.length ? filterdata.map((element) => (
          <div
            key={element._id}
            className="w-full hover:scale-102 duration-200 max-w-xl  mx-auto px-3 md:px-7 py-2 md:py-6 dark:bg-card-color bg-white rounded-2xl shadow-xl border dark:border-border-color border-purple-200 my-3  md:my-10"
          >
             <div className="grid grid-cols-4">
                <h1 className="text-2xl  overflow-hidden col-span-3 md:text-lg text-[15px]  font-bold text-orange-500 mb-2 md:mb-3 flex items-center gap-2">
                {element.title}
              </h1>
              <img className="col-span-1 md:size-15 size-7 object-cover rounded-full" src={`https://skillbridge-x62a.onrender.com/uploads/${element.image}`}  alt="" />
              </div>
            <p
              className={`dark:text-secondary-text-color text-[12px] md:text-sm text-gray-700 md:mb-4 mb-2 cursor-pointer transition-all duration-300 ${showFullDesc ? " break-words" : "truncate"
                }`}
              onClick={handleToggleDescription}
              title="Click to toggle full description"
            >
              {element.canapply}
            </p>
            <div className="flex flex-wrap gap-2 md:gap-4 md:text-sm text-[12px] dark:text-text-color text-gray-800 mb-5">
              <div className="flex items-center gap-1 md:gap-2">
                <PermanentJobIcon className="size-[18px] md:size-[22px]" />
                <span>{element.jobtype}</span>
              </div>
              <div className="flex items-center dark:text-text-color  gap-1 md:gap-2">
                <CoinsDollarIcon className="dark:text-text-color size-[18px] md:size-[22px]" color="black" />
                <span>₹{element.budget}</span>
              </div>
              <div className="flex justify-center overflow-hidden items-center  gap-1 md:gap-2">
                <SkewIcon className="size-[18px] md:size-[22px]"/>
                <p
                  className={`dark:text-text-color w-full f text-gray-800 mb-4 cursor-pointer transition-all duration-300 ${showAllSkills ? " break-words wrap-break-word " : "truncate"
                    }`}
                  onClick={() => setShowAllSkills(!showAllSkills)}
                  title="Click to show all skills"
                >               

                  <span className="font-semibold dark:text-text-color text-gray-600">Skills:</span>{" "}
                  {element.skill.join(", ")}
 </p>

              </div>
              <div className="flex items-center dark:text-secondary-text-color  gap-2 md:gap-4">
                <Time01Icon color="black" className="dark:text-secondary-text-color size-[15px] md:size-[22px]" size={20} />
                <p className="mdtext-sm text-[12px] dark:text-secondary-text-color text-gray-500">
                  Posted on:{" "}
                  {new Date(element.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                  })}
                </p>
                {element.active?<h1 className="rounded-full  px-4 py-1 font-extrabold md:text-sm text-[10px]  text-blue-500" >Active hiring</h1>:""}
              </div>
            </div>

            <div className="flex justify-center items-center pt-1 md:pt-4 border-t dark:border-border-color border-gray-200">
              <button
                onClick={() => {
                  setSelectedJob(element);
                  getpage(true);
                }}
                className=" cursor-pointer bg-purple-400 text-white dark:bg-secondary-text-color dark:text-card-color rounded-2xl dark:hover:bg-text-color hover:bg-purple-500 md:text-lg text-[12px] px-3 md:px-6 py-1 md:py-2 duration-200"
              >
                View
              </button>
            </div>
          </div>
        )) : <div className="flex w-full h-full justify-center items-center" role="status">
          <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 dark:fill-white  fill-purple-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
        }

        {/* Modal */}
        {/* Modal */}
 {showpage && selectedJob && (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.2 }}
    className="fixed z-50 top-0 left-0 h-screen w-screen bg-black/40 backdrop-blur-sm flex justify-center items-center"
  >
    <div className="md:w-2/3 h-full  rounded-2xl overflow-y-auto dark:bg-bg-dark bg-white shadow-2xl border dark:border-border-color border-gray-300">

      {/* Header */}
      <div className="flex justify-between items-center px-5 py-4 rounded-t-2xl bg-purple-100 dark:bg-border-color border-b-2 border-gray-400 dark:border-border-color">
        <h1 className="text-purple-600 text-sm   dark:text-text-color font-semibold md:text-lg">
          Applying to {selectedJob.title}
        </h1>
        <button
          onClick={() => getpage(!showpage)}
          className="text-gray-600 hover:text-black text-sm md:text-xl"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="w-full h-fit p-6 flex flex-col gap-6 dark:bg-card-color bg-white">

        {/* Job Title + Logo */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="md:text-3xl font-bold text-sm  text-orange-500">{selectedJob.title}</h1>
            <p className="md:text-sm text-[12px] text-gray-500 mt-1">Exciting opportunity awaits!</p>
          </div>
          <img
            className="md:w-20 md:h-20 w-10 h-10 object-cover rounded-full shadow-md border"
            src={`https://skillbridge-x62a.onrender.com/uploads/${selectedJob.image}`}
            alt="Company Logo"
          />
        </div>

        {/* Job Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 md:p-4 p-2 bg-purple-50 rounded-sm md:rounded-xl shadow-sm">
            <Home02Icon className="md:size-[24px] size-[18px] "  color="darkpink" />
            <span className="text-gray-800 font-medium">{selectedJob.jobtype}</span>
          </div>
          <div className="flex items-center gap-3  md:p-4 p-2 bg-green-50 rounded-sm md:rounded-xl shadow-sm">
            <DollarCircleIcon className="md:size-[24px] size-[18px] " color="green" />
            <span className="text-gray-800 font-medium">₹{selectedJob.budget}</span>
          </div>
          <div className="flex items-center gap-3 md:p-4 p-2 bg-blue-50 rounded-sm md:rounded-xl shadow-sm">
            <UserSquareIcon className="md:size-[24px] size-[18px] " color="black" />
            <span className="text-gray-800 font-medium">{selectedJob.opportunity}</span>
          </div>
        </div>

        {/* Can Apply */}
        <div className="bg-sky-100 dark:bg-border-color p-3 md:p-5 rounded-xl shadow-inner text-gray-800 dark:text-secondary-text-color text-[12px] md:text-sm max-h-[200px] overflow-y-auto">
          <p>{selectedJob.canapply}</p>
        </div>

        {/* Active Hiring & Skills */}
        <div className="flex flex-wrap gap-3">
          <span className="bg-blue-100 text-blue-700 font-bold px-[7px] text-[12px] md:px-3 md:py-1 py-[3px] rounded-2xl md:rounded-full  ">
            Active Hiring
          </span>
          <span className="bg-gray-200 md:text-sm whitespace-pre-wrap break-words text-[12px] text-gray-700 px-3 py-1 rounded-2xl md:rounded-full">
            Skills: {selectedJob.skill.join(", ")}
          </span>
        </div>

        {/* About Company */}
        <div className="bg-orange-50 text-[12px] md:text-sm whitespace-pre-wrap break-words dark:bg-border-color md:p-5 p-3 rounded-xl shadow-inner text-sm text-gray-800 dark:text-secondary-text-color max-h-[200px] overflow-y-auto">
          <span className="font-semibold text-[12px] md:text-sm text-orange-500 dark:text-text-color">
            About Company:
          </span>{" "}
          {selectedJob.description}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => getpage(!showpage)}
            className="text-sm bg-white hover:bg-gray-200 rounded-2xl px-4 py-2 border border-gray-300"
          >
            Close
          </button>
          <button
            onClick={() => {
              const jobid = selectedJob._id;
              navigate("/freelancer/apply", {
                state: { themtrue, jobid },
              });
            }}
            className="text-sm bg-purple-500 hover:bg-purple-600 text-white border-2 border-purple-500 rounded-2xl px-4 py-2"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  </motion.div>
)}









       {
  showNotification && (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 bg-purple-600 text-white px-5 py-2 rounded-2xl shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5 text-white"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 4.5c.667 0 1.333.167 2 .5a7.5 7.5 0 11-4 0c.667-.333 1.333-.5 2-.5z" />
        </svg>
        <span className="text-sm font-medium">Action completed successfully!</span>
      </div>
    </div>
  )
}


        <div className="w-full h-fit dark:bg-card-color bg-white p-4 rounded-xl shadow-md">
          {/* Heading and Add Button */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold dark:text-text-color text-gray-800">Reviews</h1>

          <motion.div
  onClick={() => reviewfalse(!reviewtrue)}
  whileTap={{ scale: 0.8 ,
    rotate:180
  }} // 🔥 Ye hai “chatka” effect
  transition={{ type: "spring", duration:0.5 }} // smooth bounce
  className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full shadow transition duration-200"
  title="Add Review"
>
  <PlusSignIcon className="w-5 h-5" />
</motion.div>
          </div>

          {/* Toggle Input Section */}
         <AnimatePresence>
  {reviewtrue && (
    <motion.div
      key="review-box"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-col gap-3 mb-6"
    >
      <input
        placeholder="rate"
        onChange={handlereview}
        className="p-2 rounded-lg border border-gray-300 dark:border-border-color dark:bg-border-color dark:text-text-color outline-none"
        type="number"
        name="rate"
        max={5}
        min={0}
      />
      <textarea
        onChange={handlereview}
        rows="4"
        name="Comment"
        placeholder="Write your review..."
        className="p-2 rounded-lg border border-gray-300 dark:border-border-color dark:bg-border-color dark:text-text-color outline-none"
      ></textarea>
      <button
        onClick={() => {
          PostReview();
          window.location.reload(); // optional, agar animation ke baad reload chahiye
        }}
        className="self-end bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg"
      >
        Send
      </button>
    </motion.div>
  )}
</AnimatePresence>

          {/* Review List Placeholder */}
          <div className="flex flex-wrap gap-4 justify-center px-4">
            {reviewdata.length > 0 ? reviewdata.map((element, index) => {
              return (
                <div
                  key={index}
                  className="w-full sm:w-[300px] md:w-[350px] bg-white dark:bg-border-color rounded-xl shadow-md p-4"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-800 dark:text-text-color">{element.name}</p>
                    <img
                      src={`https://skillbridge-x62a.onrender.com/uploads/${element.profileImage}`}
                      alt="profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-start text-sm text-orange-600 mb-2">
                    <StarIcon className="w-4 h-4 mr-1" />
                    {element.rate}
                  </div>

                  {/* Comment */}
                <p className="text-gray-700 dark:text-secondary-text-color break-words whitespace-normal text-sm">
  {element.Comment}
</p>

                </div>
              );
            }) : (
              <div className="flex w-full h-full justify-center items-center" role="status">
          <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 dark:fill-white  fill-purple-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
            )}
          </div>

<div onClick={()=>setShowAll(!showAll)} className="w-full md:py-3 py-2 self-center border-b-2 dark:border-border-color flex items-center justify-center dark:text-gray-400 "> view all</div>

        </div>




      </div >

    </div>

  );
};
