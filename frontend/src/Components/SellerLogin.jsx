

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setIsSeller } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function SellerLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isseller } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ✅ handle input change
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // ✅ handle login submit
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        // "http://localhost:5000/api/seller/login",
        `${import.meta.env.VITE_API_URL}/api/seller/login`,
        formData,
        { withCredentials: true }
      );

      if (res.status === 200) {
        dispatch(setUser({ email: formData.email }));
        dispatch(setIsSeller(true));
        toast.success("Seller login successful!");
        navigate("/seller");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed!");
    }
  }

  // ✅ this must stay OUTSIDE of handleSubmit
  useEffect(() => {
    const checkAuth = async () => {
      try {
       const res = await axios.get(
        "http://localhost:5000/api/seller/is-auth",
        // `${import.meta.env.VITE_API_URL}/api/seller/is-auth`,
         {
           withCredentials: true,
         });

        if (res.status === 200) {
          dispatch(setUser({ email: res.data.email }));
          dispatch(setIsSeller(true));
          navigate("/seller"); // auto redirect if already logged in
        }
      } catch (err) {
        console.log("Not logged in");
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-[90%] max-w-md border"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
          Seller Login
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter seller email"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Login as Seller
        </button>
      </form>
    </div>
  );
}

export default SellerLogin;
