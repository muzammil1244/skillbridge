import { LockPasswordIcon, Mail01Icon, UserSquareIcon } from "hugeicons-react";
import { useState } from "react";
import { motion } from "motion/react"
import { useNavigate, useNavigation } from "react-router-dom";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    reason: "",
    profileImage: "",
  });

  const navigate= useNavigate()
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
  setFormData({ ...formData, [name]: files[0] }); // ✅ File object, not URL
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const Submitfun =async (e) => {
     e.preventDefault(); //
  
     const realFormData = new FormData();
  realFormData.append("name", formData.name);
  realFormData.append("email", formData.email);
  realFormData.append("password", formData.password);
  realFormData.append("roll", formData.reason);
  realFormData.append("profileImage", formData.profileImage); // this must be the File object


   try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      body: realFormData, // ✅ Don't stringify
    });

    const data = await response.json();
    if (!response.ok) {
      // 🧠 Server ne 400 ya 500 bheja hoga
      if (data.error && data.details.includes("duplicate key")) {
        alert("Email already exists. Please use a different email.");
      } else {
        alert("Registration failed: " + data.error);
      }
    } else {
      alert("Registration successful!");
      console.log(data);
      navigate("/login")
    }
  } catch (err) {
    console.error("Error submitting form:", err);


  }
     

  }

  return (
    <div className="bg-white h-screen md:h-[100%] lg:h-screen md:flex-col   lg:w-screen lg:px-5 lg:py-3  lg:flex lg:flex-row overflow-hidden">
      <div className="md:relative px-4 h-screen   py-4 lg:w-1/2 lg:h-full md:px-10 md:py-10  shadow-xl bg-white lg:px-10 lg:py-4 overflow-y-hidden">
        < motion.div
          initial={{
            x: -50
          }}
          animate={{
            x: 0
          }}
          transition={{
            delay: 1.2
          }}



          className="flex lg:h-15 overflow-hidden justify-around items-center   lg:mb-5 ">


          <h1 className="text-sm text-purple-500 font-bold"> Skill <span className="text-blue-900">Bridge</span> </h1>

          <h1 className="text-3xl text-purple-600  flex ml-10    font-bold">Registration</h1>

        </ motion.div>
        <form className="md:space-y-4 md:block h-2/3 flex md:mt-0 mt-10 flex-col justify-around" onSubmit={Submitfun}>
          <motion.div
            initial={{
              x: -10
            }}
            animate={{
              x: 0
            }}
            transition={{
              delay: 1.3
            }}
          >
            <label className="block text-gray-700 mb-2 flex gap-2"><UserSquareIcon /> User Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter User Name"
              onChange={handleChange}
              className="w-full px-2 py-1 p-2 border border-gray-300 shadow-sm  rounded"
            />
          </motion.div>

          <motion.div
            initial={{
              x: -10
            }}
            animate={{
              x: 0
            }}
            transition={{
              delay: 1.3
            }}>
            <label className="block text-gray-700 mb-2  flex gap-2"><Mail01Icon /> Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
              className="w-full px-2 py-1 p-2 border border-gray-300 shadow-sm  rounded"
            />
          </motion.div>

          <motion.div
            initial={{
              x: -10
            }}
            animate={{
              x: 0
            }}
            transition={{
              delay: 1.3
            }}>
            <label className="block text-gray-700 mb-2  flex gap-2"><LockPasswordIcon /> password </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              className="w-full px-2 py-1 p-2 border border-gray-300 shadow-sm  rounded"
            />
          </motion.div>

          <motion.div
            initial={{
              x: -10
            }}
            animate={{
              x: 0
            }}
            transition={{
              delay: 1.3
            }}>
            <h2 className="text-gray-700">Choose Reason</h2>
            <label className="mr-4">
              <input
                type="radio"
                name="reason"
                value="freelancer"
                onChange={handleChange}
                className="appearance-none size-4 rounded-full  border border-gray-400 checked:bg-purple-500 checked:border-transparent checked:outline-white checked:outline-2 focus:outline-none"
              />
              <span className="ml-1">Freelancer</span>
            </label>

            <label>
              <input
                type="radio"
                name="reason"
                value="employer"
                onChange={handleChange}
                className="appearance-none size-4 rounded-full border border-gray-400 checked:bg-purple-500 checked:border-transparent checked:outline-white checked:outline-2 focus:outline-none"

              />
              <span className="ml-1">Employer</span>
            </label>
          </motion.div>

          <motion.div
            initial={{
              x: -10
            }}
            animate={{
              x: 0
            }}
            transition={{
              delay: 1.3
            }}>
            <label id="profileImage" className="block text-gray-700">Choose Profile Image</label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 text-center w-40 px-3 bg-purple-300 pl-3 shadow  p-1  rounded-xl"
            />
          </motion.div >
          < motion.div
            initial={{
              x: -10
            }}
            animate={{
              x: 0
            }}
            transition={{
              delay: 1.3
            }} className="md:flex   gap-4 md:items-center md:justify-center">
            <button type="submit" className="md:px-40 ml-3 md:ml-0 bg-purple-500 md:py-2 rounded text-white mt-5 px-30 py-2 cursor-pointer"> Submit</button>
            <h1 onClick={()=>navigate("/login")} className=" font-extrabold  text-purple-500 hover:border-b-[3px] mt-2 cursor-pointer hover:border-purple-500  ">go for Login</h1>
          </motion.div>


        </form>

        <motion.div
          viewport={{ once: true }}

          initial={{
            y: 0
          }}

          animate={{
            y: [0, -100, 0, -900]
          }}
          transition={{
            delay: 0.5,
            duration: 1,

          }}

          className="w-full h-full absolute top-0 left-0  bg-purple-500">

        </motion.div>
      </div>

      <div className="relative hidden md:py-20 md:block  lg:block lg:w-1/2 lg:h-full bg-purple-500  items-center justify-center  lg:flex md:flex  flex-col">
        <motion.div

          drag
          dragConstraints={{ left: -100, right: 100, top: -50, bottom: 10 }}
          animate={{ x: 0, y: 0 }}
          whileDrag={{ scale: 0.9 }}
          dragElastic={0.5}


          className="bg-white p-6 rounded-xl shadow-md w-72 text-center">
          <div className="mb-4">
            {formData.profileImage ? (
              <img
                  src={formData.profileImage ? URL.createObjectURL(formData.profileImage) : ""}

                className="w-24 h-24 mx-auto rounded-full object-cover"
                alt="Profile"
              />
            ) : (
              <div className="w-24 h-24 mx-auto rounded-full bg-purple-300 flex items-center justify-center text-white text-xl">
                ?
              </div>
            )}
          </div>

          <h2 className="text-xl font-bold text-orange-500">
            {formData.name || "Your Name"}
          </h2>
          <p className="text-sm text-gray-600">
            {formData.email || "youremail@example.com"}
          </p>

          <p className="mt-2 text-sm text-purple-800 font-semibold">
            {formData.reason || "Role: Not selected"}
          </p>
        </motion.div>

        <h1 className="text-2xl text-white mt-4">Skill Bridge</h1>
        <p className="text-10 text-white text-center w-2/3">Skill Bridge helps you get real internships and freelance opportunities.
          Start your career journey by connecting with the right employers.</p>


        <motion.div

          initial={{
            y: 0
          }}
          viewport={{ once: true }}

          animate={{
            y: [0, 100, 0, 900]
          }}
          transition={{
            delay: 0.5,
            duration: 1,

          }}

          className="w-full h-full absolute top-0 left-0  bg-white">

        </motion.div>
      </div>
    </div>
  );
};
