import React from "react";
import { FaRegBookmark } from "react-icons/fa6";
import { useNavigate } from "react-router";

const Job = () => {
  const navigate = useNavigate();
  const jobId = "rextcyvguhbj";
  return (
    <div className="
      bg-white shadow-md border rounded-xl 
      p-4 sm:p-5 
      hover:shadow-xl transition-all duration-300
      w-full
    ">
      
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <p className="text-gray-500 text-xs sm:text-sm">2 days ago</p>
        <button className="p-2 border rounded-full hover:bg-gray-100 transition">
          <FaRegBookmark size={18} />
        </button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mt-3">
        <img
          src="https://imgs.search.brave.com/17zRUpxGIfv51vP4KzWshb_aKfmqwcn_EuI-oR05-G0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjAv/MzAxLzkyMC9zbWFs/bC9nb29nbGUtbG9n/by1vbi1idXR0b24t/ZnJlZS1wbmcucG5n"
          alt="logo"
          className="w-10 h-10 sm:w-12 sm:h-12"
        />
        <div>
          <h3 className="text-base sm:text-lg font-semibold">Company Name</h3>
          <p className="text-gray-500 text-xs sm:text-sm">India</p>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg sm:text-xl font-bold mt-3">Title</h2>

      {/* Description */}
      <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda eos
        provident a, dolorem perferendis ducimus deserunt nesciunt quae sequi.
      </p>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <span className="text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold">
          12 Positions
        </span>
        <span className="text-red-600 bg-red-100 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold">
          Part Time
        </span>
        <span className="text-purple-700 bg-purple-100 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold">
          24 LPA
        </span>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 mt-5">
        <button className="border px-4 sm:px-5 py-1.5 text-sm rounded-lg hover:bg-gray-100 transition font-medium" onClick={() => navigate(`/description/${jobId}`)}>
          Details
        </button>

        <button className="px-4 sm:px-5 py-1.5 text-sm rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:opacity-90 transition">
          Save For Later
        </button>
      </div>
    </div>
  );
};

export default Job;
