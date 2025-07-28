import { LockPasswordIcon, Mail01Icon } from "hugeicons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { jwtDecode } from "jwt-decode";

export const Loging = () => {
  const [getdata, setdata] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...getdata, [name]: value });
  };

  const navigate = useNavigate();

  const Submitdata = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://skillbridge-x62a.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getdata),
      });

      if (!response.ok) {
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
      console.log("Login error:", err);
    }
  };

  return (
    <div className="md:w-screen md:h-screen bg-white flex-col-reverse md:flex-row  flex  overflow-hidden font-sans">
      {/* Left Form Panel */}
      <div className="bg-white md:w-1/2 h-full p-10 relative md:overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ x: -30 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-around mb-10"
        >
          <h1 className="text-sm text-purple-500 font-bold"> Skill <span className="text-blue-900">Bridge</span> </h1>
          <h1 className="text-xl text-purple-600 font-bold ml-6">Login</h1>
          <div className="ml-auto">
            <h1
              onClick={() => navigate("/register")}
              className="text-purple-500 hover:border-purple-500 w-fit hover:border-b-[3px] cursor-pointer font-bold"
            >
              New Register
            </h1>
          </div>
        </motion.div>

        {/* Form */}
        <form className="space-y-8 mt-16" onSubmit={Submitdata}>
          {/* Email */}
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

          {/* Password */}
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

          {/* Submit Button */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <button
              type="submit"
              className="w-full py-2 bg-purple-500 hover:bg-purple-600 transition-all text-white rounded-lg text-lg font-semibold shadow-md"
            >
              Submit
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
          src="/src/imgs/Computer login-amico.svg"
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
