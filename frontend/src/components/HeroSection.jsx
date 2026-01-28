import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center mt-5 px-4">
      <div className="flex flex-col gap-5 my-10">
        
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base">
          No. 1 Job Hunt Website
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Search, Apply & <br />
          Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>

        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
           Your dream career is just one search away. 
  Explore verified jobs, connect with recruiters, and build a future you love.
        </p>

        {/* 🔍 Responsive Search Box */}
        <div
          className="
            flex items-center gap-3
            w-full sm:w-[90%] md:w-[70%] lg:w-[45%]
            h-14 sm:h-16
            shadow-lg border border-gray-200
            rounded-full px-4 mx-auto
            bg-white
          "
        >
          <input
            type="text"
            placeholder="Find Your Dream Jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="
              flex-1 outline-none border-none
              text-sm sm:text-base
              text-gray-700
              placeholder-gray-400
            "
          />

          <button
            onClick={searchJobHandler}
            className="
              h-10 w-10 sm:h-12 sm:w-12
              flex items-center justify-center
              rounded-full bg-[#6A38C2]
              text-white hover:opacity-90 transition
            "
          >
            <CiSearch className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
    