// import React, { useState } from "react";
// // import logo from "../../src/imges/logo.webp"
// import { Link, useNavigate } from "react-router-dom";
// import { FaBowlFood } from "react-icons/fa6";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setUser } from "../redux/authSlice";
// import toast from "react-hot-toast";



// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errormessage,seterrormessage]=useState("")
//   const navigate=useNavigate()
//   const dispatch=useDispatch()
//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await axios.post("http://localhost:5000/api/users/login", {
//       email,
//       password,
//     },{ withCredentials: true });
//     console.log(res.data);
    
//     // Save token to localStorage if needed
//     // localStorage.setItem("token", res.data.token);
//     dispatch(setUser(res.data.user));
//     navigate("/"); // redirect after login
//     toast.success("Logged in succefully")
//   } catch (err) {
//     console.error(err.response.data.message);
//     seterrormessage(err.response.data.message);
//   }
// };

//   return (
//     <div className="bgwh">
      
//       <div className=" bg-gradient-to-r from-pink-200 to-pink-800 h-screen container mx-auto flex  items-center justify-center text-white">
//         {/* Header */}
//         <header className="absolute top-0 left-0 w-full flex justify-between items-center p-5  ">
//           <a href="https://prebuiltui.com" className="flex text-2xl items-center gap-2">
//                               {/* <img src='' alt="Bekary" className={`h-9 ${isScrolled && "invert opacity-80"}`} /> */}
//                               <FaBowlFood className="text-orange-400"></FaBowlFood>
//                               <p className=" text-orange-400 ">Bekary</p>
//                           </a>
//           <div className="flex items-center space-x-4">
            
//             <Link
//               to={"/signup"}
//               className="bg-orange-500 p-1 text-sm md:text-md md:py-2 md:px-4 rounded-md"
//             >
//              SignUp 
//             </Link>
//           </div>
//         </header>

//         {/* Login Form */}
//         <div className="bg-pink-900 p-8 rounded-lg shadow-lg w-[500px] m-8 md:m-0 mt-20">

//           <h2 className="text-2xl font-bold mb-4 text-center">
//             Welcome to <span className="text-orange-500">Bekary</span>
//           </h2>
//           <p className="text-center text-gray-400 mb-6">
//             Login to Our Web site!
//           </p>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="email" className=" text-gray-400 mb-2">
//                 Email
//               </label>
//               <input
//                 type="text"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full p-3 rounded-md bg-pink-900 border border-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="name@email.com"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="password" className=" text-gray-400 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type="password"
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full p-3 rounded-md bg-pink-900 border border-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="********"
//                   required
//                 />
//                 <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
//                   👁️
//                 </span>
//               </div>
//             </div>
//             {errormessage && (
//               <div className="mb-4 text-red-500 text-center">
//                 {errormessage}
//               </div>
//             )}
//             <button
//               type="submit"
//               className="w-full bg-orange-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md transition"
//             >
//               login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBowlFood } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errormessage, seterrormessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        { withCredentials: true }
      );

      dispatch(setUser(res.data.user));
      navigate("/");
      toast.success("Logged in successfully 🎉");
    } catch (err) {
      seterrormessage(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="bg-gradient-to-r from-pink-300 via-red-400 to-orange-300 min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Top Navigation */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4">
        <a href="/" className="flex text-2xl items-center gap-2 font-bold">
          <FaBowlFood className="text-orange-600 text-3xl" />
          <span className="text-white">Bekary</span>
        </a>
        <Link
          to="/signup"
          className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white shadow-md transition"
        >
          Sign Up
        </Link>
      </header>

      {/* Glassmorphism Login Card */}
      <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl w-[90%] max-w-md border border-white/20 mt-12">
        <h2 className="text-3xl font-bold mb-2 text-center text-white drop-shadow-md">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-200 mb-6">
          Login to your <span className="text-orange-300 font-semibold">Bekary</span> account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="text-gray-200 mb-2 block text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-300"
              placeholder="name@email.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="text-gray-200 mb-2 block text-sm"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-300"
                placeholder="********"
                required
              />
              <span
                className="absolute right-3 top-3 text-gray-300 cursor-pointer hover:text-white transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {errormessage && (
            <p className="text-red-400 text-center text-sm">{errormessage}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-[1.02]"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-300 text-sm mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-300 font-semibold hover:underline"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
