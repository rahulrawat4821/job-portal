import React from "react";

const appliedJobs = [
  {
    date: "17-07-2024",
    role: "Frontend Developer",
    company: "Google",
    status: "Selected",
  },
  {
    date: "17-07-2024",
    role: "Frontend Developer",
    company: "Google",
    status: "Selected",
  },
];

function AppliedJobTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        {/* Table Head */}
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="py-3 px-4 font-medium">Date</th>
            <th className="py-3 px-4 font-medium">Job Role</th>
            <th className="py-3 px-4 font-medium">Company</th>
            <th className="py-3 px-4 font-medium text-right">Status</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {appliedJobs.map((job, index) => (
            <tr
              key={index}
              className="border-b border-gray-400 last:border-b-0 hover:bg-gray-50 transition"
            >
              <td className="py-4 px-4">{job.date}</td>
              <td className="py-4 px-4">{job.role}</td>
              <td className="py-4 px-4">{job.company}</td>
              <td className="py-4 px-4 text-right">
                <span className="inline-block bg-slate-900 text-white text-sm px-4 py-1 rounded-full">
                  {job.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppliedJobTable;
