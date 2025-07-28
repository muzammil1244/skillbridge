import { Register } from "./auth/register";
import { Loging } from "./auth/login";
import { Home } from "./employer/home";
import { Create } from "./employer/create";
import { Update } from "./employer/update"
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Applications } from "./employer/Applications";
import ChatApp from "./components/chat";
import { Homee } from "./freelancer/Home";
import { Apply } from "./freelancer/Apply";
import { Application } from "./freelancer/Application";
import { Review } from "./freelancer/ReviewApplication";
import { Resume } from "./freelancer/Resumeedite";
import { useEffect, useState } from "react";
import { ProtectRout } from "./freelancer/protectroutes";
import { jwtDecode } from "jwt-decode";
import { Loader } from "./components/loader";

function AuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return navigate("/login");
     
    }

    try {
      const decoded = jwtDecode(token);
      const role = decoded.roll; // ✅ make sure it's 'role', not 'roll'
console.log("app " , role)
      if (role === "freelancer" ) {
        navigate("/freelancer/home");
      } else if (role === "employer") {
        navigate("/employer/home");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log("Invalid token", err);
      navigate("/login");
    }
  }, [navigate]);

  return null; // ❌ console.log mat karo, just return null
}

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRedirect />} />

        <Route path="/login" element={<Loging />} />
<Route path="/loader" element={<Loader/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/employer/home" element={<ProtectRout> <Home /> </ProtectRout>} />
        <Route path="/employer/job/create" element={<Create />} />
        <Route path="/employer/job/update" element={<Update />} />
        <Route path="/employer/job/application" element={<Applications />} />
        <Route path="/chatapp" element={<ChatApp />} />
        <Route path="freelancer/home" element={<ProtectRout> <Homee /> </ProtectRout>} />
        <Route path="freelancer/apply" element={<Apply />} />
        <Route path="freelancer/application" element={<Application />} />
        <Route path="freelancer/review" element={<Review />} />
        <Route path="freelancer/resume" element={<Resume />} />


      </Routes>
    </BrowserRouter>

  );
}

export default App;
