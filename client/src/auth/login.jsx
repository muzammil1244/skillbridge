import { LockPasswordIcon, Mail01Icon } from "hugeicons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { jwtDecode } from "jwt-decode";
import img1 from "../imgs/Computer login-amico.svg"

export const Loging = () => {
  const [getdata, setdata] = useState({
    email: "",
    password: "",
  });

  const [loader,sertloader] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...getdata, [name]: value });
  };

  const navigate = useNavigate();

  const Submitdata = async (e) => {
    e.preventDefault(); 
         sertloader(true)

   
       


    try {
      const response = await fetch("https://skillbridge-x62a.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getdata),
      });

      if (!response.ok) {
                sertloader(false)

        alert("Something wrong with email or password");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      const role = jwtDecode(data.token);
      if (role.roll === "freelancer") {
        navigate("/freelancer/home");
      } else {
        navigate("/employer/home");
      }
    } catch (err) {
        sertloader(false)
      console.log("Login error:", err);
    }
  };

  return (
    <div className="md:w-screen md:h-screen bg-white flex-col-reverse md:flex-row  flex  overflow-hidden font-sans">
      <div className="bg-white md:w-1/2 h-full p-10 relative md:overflow-y-auto">
        <motion.div
          initial={{ x: -30 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-around  md:mb-10"
        >
          <h1 className="text-sm text-purple-500 font-bold"> Skill <span className="text-blue-900">Bridge</span> </h1>
          <h1 className="md:text-xl text-sm  text-purple-600 font-bold ml-6">Login</h1>
          <div className="ml-auto">
            <h1
              onClick={() => navigate("/register")}
              className="text-purple-500 md:text-lg text-sm hover:border-purple-500 w-fit hover:border-b-[3px] cursor-pointer font-bold"
            >
              New Register
            </h1>
          </div>
        </motion.div>

        <form className="space-y-8 mt-16" onSubmit={Submitdata}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center gap-2">
              <Mail01Icon />
              <input
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-purple-500"
                type="email"
                name="email"
              />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="flex items-center gap-2">
              <LockPasswordIcon />
              <input
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-purple-500"
                type="password"
                name="password"
              />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <button
              type="submit"
              className="w-full md:py-2 py-1 bg-purple-500 hover:bg-purple-600 transition-all text-white rounded-lg text-lg font-semibold shadow-md"
            >
              {loader? <div className="flex w-full h-full justify-center items-center" role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 dark:fill-white  fill-purple-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>:<h2>Submit</h2>}
            </button>
          </motion.div>
        </form>
      </div>

      {/* Right Hero Panel */}
      <div className="bg-purple-500 md:w-1/2 md:h-full  overflow-hidden flex items-center flex-col justify-center relative">
        <motion.img
          initial={{ y: -40 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 60 }}
          className="w-72 mb-6"
          src={img1}
          alt="hero"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center hidden md:block px-6 max-w-xl"
        >
          <h1 className="text-3xl text-white font-extrabold mb-2">Hey, welcome back </h1>
          <p className="text-lg text-white">
            This is <span className="font-semibold text-gray-200">SkillBridge</span> — your personalized platform to
            discover high-quality opportunities that match your skills and goals.
          </p>
          <p className="mt-4 text-white">
            Whether you're a freelancer looking for exciting projects or an employer seeking top talent —
            I’m here to guide you every step of the way.
          </p>
          <p className="mt-4 italic font-medium text-white">
            Let’s find the perfect match for your journey. <br />
            Log in and let’s get started!
          </p>
        </motion.div>
      </div>
    </div>
  );
};
