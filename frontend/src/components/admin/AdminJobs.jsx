import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../../Hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "../../redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs(); // fetch jobs on mount
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  // Update Redux search text whenever input changes
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          value={input || ""}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search by job title or company"
          className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        <button
          onClick={() => navigate("/admin/jobs/create")}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          New Job
        </button>
      </div>

      {/* Jobs Table */}
      <AdminJobsTable />
    </div>
  );
};

export default AdminJobs;
