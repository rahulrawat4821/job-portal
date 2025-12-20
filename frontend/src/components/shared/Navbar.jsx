import React, { useState, useRef, useEffect } from "react";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/context";
import { setUser } from "../../redux/authSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ SAFE PROFILE PHOTO
  const profilePhoto = user?.profile?.profilePhoto || null;

  // ✅ LOGOUT
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  // ✅ CLOSE DROPDOWN ON OUTSIDE CLICK
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
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          Job<span className="text-[#F83002]">Portal</span>
        </h1>

        {/* Nav Items */}
        <div className="flex items-center gap-6 relative">
          <ul className="flex items-center font-medium gap-5">
  {user && user.role === "recruiter" ? (
    <>
      <li>
        <Link to="/admin/companies">Companies</Link>
      </li>
      <li>
        <Link to="/admin/jobs">Jobs</Link>
      </li>
    </>
  ) : (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/jobs">Jobs</Link></li>
      <li><Link to="/browse">Browse</Link></li>
    </>
  )}
</ul>

          {/* AUTH SECTION */}
          {!user ? (
            <div className="flex items-center gap-3 font-medium">
              <Link to="/login">Login</Link>
              <Link to="/signup">
                <button className="bg-[#6A38C2] hover:bg-[#5f2db4] text-white px-4 py-2 rounded-xl">
                  SignUp
                </button>
              </Link>
            </div>
          ) : (
            <div ref={menuRef} className="relative">
              {/* Avatar */}
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="avatar"
                  onClick={() => setOpen(!open)}
                  className="w-10 h-10 rounded-full cursor-pointer border object-cover"
                />
              ) : (
                <div
                  onClick={() => setOpen(!open)}
                  className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
                >
                  <CiUser className="text-xl text-gray-600" />
                </div>
              )}

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-xl p-4 z-50">
                  {/* User Info */}
                  <div className="flex gap-3 items-center border-b pb-3">
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        className="w-12 h-12 rounded-full object-cover"
                        alt="profile"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                        <CiUser className="text-xl text-gray-600" />
                      </div>
                    )}

                    <div>
                      <h3 className="font-semibold text-lg">{user?.fullname}</h3>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3">
                    {
                      user && user.role === "student" && (
                          <Link
                      to="/profile"
                      className="flex items-center gap-3 w-full py-2 px-2 hover:bg-gray-100 rounded-lg text-gray-700"
                    >
                      <CiUser className="text-xl" />
                      View Profile
                    </Link>
                      )
                    }
                   

                    <button
                      onClick={logoutHandler}
                      className="flex items-center gap-3 w-full py-2 px-2 hover:bg-gray-100 rounded-lg text-red-500"
                    >
                      <IoIosLogOut className="text-xl" />
                      Logout
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
