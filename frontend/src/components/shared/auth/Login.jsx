import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../../utils/context";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/authSlice";

const Login = () => {
  const {loading} = useSelector(store=> store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Login Successful!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full flex justify-center mt-10 px-4">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-3xl p-8 border border-gray-400 rounded-xl shadow-sm"
      >
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
        { loading ?   <button className="w-full bg-[#0F172A] text-white p-3 rounded-lg text-lg font-medium cursor-none mb-4">
          Please wait...
        </button> :
          <button className="w-full bg-[#0F172A] text-white p-3 rounded-lg text-lg font-medium cursor-pointer mb-4">
          Login
        </button>
        }
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

export default Login;
