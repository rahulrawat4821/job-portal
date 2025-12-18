import React, { useState, useRef, useEffect } from "react";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'sonner';
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/context";
import { setUser } from "../../redux/authSlice";





const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const {user} = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate  = useNavigate();

  //logout
  const logoutHandler = async () => {
    try {
        const res = await axios.get(`${USER_API_END_POINT}/logout`, {withCredentials:true});
        if(res.data.success){
          dispatch(setUser(null));
          navigate("/");
          toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.data.message);
    }
  }

  // Close popover when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="shadow-sm">
      <div className="flex items-center justify-between mx-18 max-w-7xl h-16">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          Job<span className="text-[#F83002]">Portal</span>
        </h1>

        {/* Nav Items */}
        <div className="flex items-center gap-6 relative">
          <ul className="flex items-center font-medium gap-5">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/browse">Browse</Link></li>
          </ul>
          {!user ? (
            <div className="flex items-center gap-2 font-medium">
              <Link to="/login">
                <button className="cursor-pointer">Login</button>
              </Link>

              <Link to="/signup">
                <button className="bg-[#6A38C2] hover:bg-[#5f2db4] text-white p-2 rounded-xl cursor-pointer">
                  SignUp
                </button>
              </Link>

            </div>
          ) : (
            // Avatar Button (COMMENT OUTSIDE JSX)
            <div ref={menuRef} className="relative">
              <img
                onClick={() => setOpen(!open)}
                src={user?.profile.profilePhoto}
                alt="avatar"
                className="w-10 h-10 rounded-full cursor-pointer border"
              />

              {/* Popover */}
              {open && (
                <div className="absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-xl p-4 z-50">

                  {/* Top section */}
                  <div className="flex gap-3 items-center border-b pb-3">
                    <img
                      src={user?.profile.profilePhoto}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">Rahul Rawat</h3>
                      <p className="text-sm text-gray-500">rahul@gmail.com</p>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="pt-3">
                    <button className="flex items-center gap-3 w-full py-2 text-gray-700 hover:bg-gray-100 rounded-lg px-2 cursor-pointer">
                      <CiUser className="text-gray-700 text-xl " /> <Link to="/profile">View Profile</Link>
                    </button>

                    <button onClick={logoutHandler} className="flex items-center gap-3 w-full py-2 hover:bg-gray-100 rounded-lg px-2 text-red-500 cursor-pointer">
                      < IoIosLogOut className="text-gray-700 text-xl" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;
