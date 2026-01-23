import React, { useState, useRef, useEffect } from "react";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/context";
import { setUser } from "../../redux/authSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false); // profile dropdown
  const [mobileMenu, setMobileMenu] = useState(false); // mobile menu
  const menuRef = useRef(null);

  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profilePhoto = user?.profile?.profilePhoto || null;

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
      toast.error("Logout failed");
    }
  };

  // close profile dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const NavLinks = () => (
    <>
      {user && user.role === "recruiter" ? (
        <>
          <Link to="/admin/companies" onClick={() => setMobileMenu(false)}>
            Companies
          </Link>
          <Link to="/admin/jobs" onClick={() => setMobileMenu(false)}>
            Jobs
          </Link>
        </>
      ) : (
        <>
          <Link to="/" onClick={() => setMobileMenu(false)}>
            Home
          </Link>
          <Link to="/jobs" onClick={() => setMobileMenu(false)}>
            Jobs
          </Link>
          <Link to="/browse" onClick={() => setMobileMenu(false)}>
            Browse
          </Link>
        </>
      )}
    </>
  );

  return (
    <div className="shadow-sm relative">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-4">
        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-bold">
          Job<span className="text-[#F83002]">Portal</span>
        </h1>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center font-medium gap-6">
          <NavLinks />
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <HiX /> : <HiOutlineMenu />}
          </button>

          {/* Auth Section (Desktop) */}
          {!user ? (
            <div className="hidden sm:flex items-center gap-3 font-medium">
              <Link to="/login">Login</Link>
              <Link to="/signup">
                <button className="bg-[#6A38C2] text-white px-4 py-2 rounded-xl">
                  SignUp
                </button>
              </Link>
            </div>
          ) : (
            <div ref={menuRef} className="relative hidden md:block">
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

              {/* Profile Dropdown */}
              {open && (
                <div className="absolute right-0 mt-3 w-60 bg-white shadow-xl rounded-xl p-4 z-50">
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
                      <h3 className="font-semibold">{user?.fullname}</h3>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>

                  <div className="pt-3">
                    {user?.role === "student" && (
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 py-2 hover:bg-gray-100 rounded-lg"
                      >
                        <CiUser className="text-xl" />
                        View Profile
                      </Link>
                    )}

                    <button
                      onClick={logoutHandler}
                      className="flex items-center gap-3 py-2 text-red-500 hover:bg-gray-100 rounded-lg w-full"
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

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-40">
          <div className="flex flex-col gap-4 p-5 font-medium">
            <NavLinks />

            {!user ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">SignUp</Link>
              </>
            ) : (
              <>
                {user?.role === "student" && (
                  <Link to="/profile">Profile</Link>
                )}
                <button
                  onClick={logoutHandler}
                  className="text-left text-red-500"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
