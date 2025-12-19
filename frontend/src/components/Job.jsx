import React from "react";
import { FaRegBookmark } from "react-icons/fa6";
import { useNavigate } from "react-router";

const Job = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      className="
        bg-white shadow-md border rounded-xl 
        p-4 sm:p-5 
        hover:shadow-xl transition-all duration-300
        w-full
      "
    >
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <p className="text-gray-500 text-xs sm:text-sm">
          {job?.createdAt
            ? `${Math.floor(
                (Date.now() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24)
              )} days ago`
            : "Recently"}
        </p>

        <button className="p-2 border rounded-full hover:bg-gray-100 transition">
          <FaRegBookmark size={18} />
        </button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mt-3">
        <img
          src={job?.company?.logo || "/company.png"}
          alt="logo"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="text-base sm:text-lg font-semibold">
            {job?.company?.name}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm">
            {job?.location}
          </p>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg sm:text-xl font-bold mt-3">
        {job?.title}
      </h2>

      {/* Description */}
      <p className="text-gray-600 text-xs sm:text-sm mt-2 line-clamp-3">
        {job?.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <span className="text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-xs font-semibold">
          {job?.positions} Positions
        </span>
        <span className="text-red-600 bg-red-100 px-3 py-1 rounded-full text-xs font-semibold">
          {job?.jobType}
        </span>
        <span className="text-purple-700 bg-purple-100 px-3 py-1 rounded-full text-xs font-semibold">
          {job?.salary} LPA
        </span>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 mt-5">
        <button
          className="border px-4 sm:px-5 py-1.5 text-sm rounded-lg hover:bg-gray-100 transition font-medium"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </button>

        <button
          className="px-4 sm:px-5 py-1.5 text-sm rounded-lg 
          bg-gradient-to-r from-purple-500 to-indigo-500 
          text-white font-semibold hover:opacity-90 transition"
        >
          Save For Later
        </button>
      </div>
    </div>
  );
};

export default Job;
