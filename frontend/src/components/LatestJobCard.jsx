import React from "react";
import { useNavigate } from "react-router-dom";

const LatestJobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="
        border border-gray-200
        p-5
        rounded-2xl
        bg-white
        cursor-pointer
        transition-all
        duration-300
        hover:shadow-xl
        hover:-translate-y-1
      "
    >
      {/* Company */}
      <div className="mb-3">
        <h1 className="font-semibold text-base sm:text-lg">
          {job?.company?.name}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">India</p>
      </div>

      {/* Job Info */}
      <div>
        <h1 className="font-bold text-lg sm:text-xl my-2">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-600 line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-xs font-semibold">
          {job?.position} Positions
        </span>
        <span className="text-red-600 bg-red-100 px-3 py-1 rounded-full text-xs font-semibold">
          {job?.jobType}
        </span>
        <span className="text-purple-700 bg-purple-100 px-3 py-1 rounded-full text-xs font-semibold">
          {job?.salary} LPA
        </span>
      </div>
    </div>
  );
};

export default LatestJobCard;
