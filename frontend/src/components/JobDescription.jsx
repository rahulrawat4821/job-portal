import React from "react";

const JobDescription = () => {
  const isApplied = true;

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Frontend Developer</h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-sm font-medium">
              12 Positions
            </span>
            <span className="text-red-600 bg-red-100 px-3 py-1 rounded-full text-sm font-medium">
              Part Time
            </span>
            <span className="text-purple-700 bg-purple-100 px-3 py-1 rounded-full text-sm font-medium">
              24 LPA
            </span>
          </div>
        </div>

        {/* Apply Button */}
        <button
          disabled={isApplied}
          className={`px-6 py-2 rounded-lg font-semibold text-white ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </button>
      </div>

      {/* Divider */}
      <hr className="my-6" />

      {/* Job Description */}
      <h2 className="text-lg font-semibold mb-4">Job Description</h2>

      <div className="space-y-3 text-gray-700">
        <p>
          <span className="font-semibold text-black">Role:</span>{" "}
          Frontend Developer
        </p>
        <p>
          <span className="font-semibold text-black">Location:</span>{" "}
          Hyderabad
        </p>
        <p>
          <span className="font-semibold text-black">Description:</span>{" "}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium
          similique sed dolor!
        </p>
        <p>
          <span className="font-semibold text-black">Experience:</span> 2 yrs
        </p>
        <p>
          <span className="font-semibold text-black">Salary:</span> 12 LPA
        </p>
        <p>
          <span className="font-semibold text-black">Total Applicants:</span> 4
        </p>
        <p>
          <span className="font-semibold text-black">Posted Date:</span>{" "}
          17-07-2024
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
