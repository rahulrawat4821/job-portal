import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    PhoneNumber: "",
    password: "",
    role: "",
    file: ""
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
  }

  return (
    <div className="w-full flex justify-center mt-10 px-4">
      <form onSubmit={submitHandler} className="w-full max-w-3xl p-8 border border-gray-400 rounded-xl shadow-sm">

        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

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
            placeholder="Enter your email.."
            className="w-full border border-gray-400 p-3 rounded-lg"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            type="text"
              name="PhoneNumber"
            value={input.PhoneNumber}
            onChange={changeEventHandler}
            placeholder="Enter your PhoneNumber.."
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
            placeholder="Enter password.."
            className="w-full border border-gray-400 p-3 rounded-lg"
          />
        </div>

        {/* Role + Profile Upload */}
        <div className="flex items-center justify-between gap-4 mb-6">

          {/* Student / Recruiter */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="role"
                checked={input.role === "student"}
                value="student"
                onChange={changeEventHandler}
              />
              Student
            </label>

            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="role"
                checked={input.role === "recruiter"}
                value="recruiter"
                onChange={changeEventHandler}
              />
              Recruiter
            </label>
          </div>

          {/* Profile Upload */}
          <div>
            <label className="font-medium mr-2">Profile</label>
            <input type="file"
              onChange={changeFileHandler}
              className="border border-gray-400 p-1 rounded-md" />

          </div>
        </div>

        {/* Submit Button */}
        <button className="w-full bg-[#0F172A] text-white p-3 rounded-lg text-lg font-medium cursor-pointer">
          Signup
        </button>

        {/* Login Redirect */}
        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
