
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../../utils/context";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/authSlice";

const SignUp = () => {
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  
  useEffect(() => {
  console.log("Component mounted. Loading is:", loading);
}, []);

   
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        { withCredentials: true }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success("Registration Successful!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full flex justify-center mt-6 sm:mt-10 px-4">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-3xl p-4 sm:p-6 md:p-8 border border-gray-400 rounded-xl shadow-sm"
      >
        <h1 className="text-xl sm:text-2xl font-bold mb-6">Sign Up</h1>

        {/* Full Name */}
        <div className="mb-4">
          
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={input.fullname}
            placeholder="Enter name"
            onChange={changeEventHandler}
            className="w-full border border-gray-400 p-3 rounded-lg"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={input.email}
            name="email"
            onChange={changeEventHandler}
            placeholder="Enter your email"
            className="w-full border border-gray-400 p-3 rounded-lg"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={changeEventHandler}
            placeholder="Enter your phone number"
            className="w-full border border-gray-400 p-3 rounded-lg"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            value={input.password}
            name="password"
            onChange={changeEventHandler}
            placeholder="Enter password"
            className="w-full border border-gray-400 p-3 rounded-lg"
          />
        </div>

        {/* Role + Profile */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          {/* Role */}
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
              />
              Student
            </label>

            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
              />
              Recruiter
            </label>
          </div>

          {/* Profile Upload */}
          <div className="w-full sm:w-auto">
            <label className="font-medium mr-2 block sm:inline">
              Profile
            </label>
            <input
              type="file"
              onChange={changeFileHandler}
              className="border border-gray-400 p-1 rounded-md w-full sm:w-auto"
            />
          </div>
        </div>

        {/* Button */}
        {loading ? (
          <button
            disabled
            className="w-full bg-[#0F172A] text-white p-3 rounded-lg text-lg font-medium cursor-not-allowed"
          >
            Please wait...
          </button>
        ) : (
          <button className="w-full bg-[#0F172A] text-white p-3 rounded-lg text-lg font-medium">
            Sign Up
          </button>
        )}

        {/* Login Redirect */}
        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
