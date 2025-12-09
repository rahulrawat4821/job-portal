import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
   const [input, setInput] = useState({
     email:"",
     password:"",
     role:"",
    });
 
    const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

       const submitHandler = async(e) => {
       e.preventDefault();
       console.log(input);
   }

  return (
    <div className="w-full flex justify-center mt-10 px-4">
      <form onSubmit={submitHandler} className="w-full max-w-3xl p-8 border border-gray-400 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email.."
            name="email"
            className="w-full border border-gray-400 p-3 rounded-lg"
            value={input.email}
            onChange={changeEventHandler}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter password.."
            className="w-full border border-gray-400 p-3 rounded-lg"
            value={input.password}
            name="password"
            onChange={changeEventHandler}
          />
        </div>

        {/* Student / Recruiter */}
        <div className="flex items-center gap-4 mb-4">
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

        {/* Submit Button */}
        <button className="w-full bg-[#0F172A] text-white p-3 rounded-lg text-lg font-medium cursor-pointer mb-4">
          Login
        </button>

        {/* Sign Up Redirect */}
        <p className="text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-700">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
