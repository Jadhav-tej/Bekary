

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBowlFood } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errormessage, seterrormessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterrormessage("");

    try {
      await axios.post(
        // "http://localhost:5000/api/users/register",
        `${import.meta.env.VITE_API_URL}api/users/register`,
         {
        name,
        email,
        address,
        password,
      });

      toast.success("User registered successfully 🎉");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        seterrormessage(error.response.data.message);
      } else {
        seterrormessage("Server error. Try again later.");
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-pink-300 via-red-400 to-orange-300 min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4">
        <a href="/" className="flex text-2xl items-center gap-2 font-bold">
          <FaBowlFood className="text-orange-600 text-3xl" />
          <span className="text-white">Bekary</span>
        </a>
        <Link
          to="/login"
          className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white shadow-md transition"
        >
          Login
        </Link>
      </header>

      {/* Glassmorphism Signup Card */}
      <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl w-[90%] max-w-md border border-white/20 mt-12">
        <h2 className="text-3xl font-bold mb-2 text-center text-white drop-shadow-md">
          Create Account ✨
        </h2>
        <p className="text-center text-gray-200 mb-6">
          Sign up for your <span className="text-orange-300 font-semibold">Bekary</span> account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="text-gray-200 mb-2 block text-sm">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-300"
              placeholder="Enter your name"
              required
            />
          </div>

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

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="text-gray-200 mb-2 block text-sm"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-300"
              placeholder="Your full address"
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

          {/* Error */}
          {errormessage && (
            <p className="text-red-800 text-center text-sm">{errormessage}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-[1.02]"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-300 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-700 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
