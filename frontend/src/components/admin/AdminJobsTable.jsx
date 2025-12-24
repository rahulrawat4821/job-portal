import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const AdminJobsTable = () => {
  const navigate = useNavigate();
  const { allAdminJobs = [], searchJobByText = "" } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const search = searchJobByText.toLowerCase();

    const filtered = allAdminJobs.filter((job) => {
      const title = job.title?.toLowerCase() || "";
      const companyName = job.company?.name?.toLowerCase() || "";
      return title.includes(search) || companyName.includes(search);
    });

    setFilteredJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {filteredJobs.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-gray-500 text-sm">
              <th className="text-left py-4 px-4">Company</th>
              <th className="text-left py-4 px-4">Job Title</th>
              <th className="text-left py-4 px-4">Experience</th>
              <th className="text-left py-4 px-4">Salary</th>
              <th className="text-right py-4 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job._id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4">{job.company?.name || "N/A"}</td>
                <td className="py-4 px-4">{job.title || "N/A"}</td>
                <td className="py-4 px-4">{job.experience || 0} yrs</td>
                <td className="py-4 px-4">{job.salary || 0} LPA</td>
                <td className="py-4 px-4 flex justify-end gap-3">
                  <button
                    onClick={() => navigate(`/admin/jobs/${job._id}`)}
                    className="px-3 py-1 text-sm font-medium text-blue-600 border border-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition"
                  >
                    Edit Job
                  </button>

                  <button
                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                    className="px-3 py-1 text-sm font-medium text-green-600 border border-green-500 rounded-full hover:bg-green-500 hover:text-white transition"
                  >
                    Applicants
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-400 py-6">No jobs found.</p>
      )}
    </div>
  );
};

export default AdminJobsTable;
