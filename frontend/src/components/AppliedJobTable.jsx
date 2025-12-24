import React from "react";
import { useSelector } from "react-redux";

function AppliedJobTable() {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="py-3 px-4 font-medium">Date</th>
            <th className="py-3 px-4 font-medium">Job Role</th>
            <th className="py-3 px-4 font-medium">Company</th>
            <th className="py-3 px-4 font-medium text-right">Status</th>
          </tr>
        </thead>

        <tbody>
          {allAppliedJobs.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                You haven't applied to any jobs yet
              </td>
            </tr>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <tr key={appliedJob._id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4">
                  {appliedJob.createdAt?.split("T")[0]}
                </td>
                <td className="py-4 px-4">
                  {appliedJob.job?.title}
                </td>
                <td className="py-4 px-4">
                  {appliedJob.job?.company?.name}
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="bg-slate-900 text-white px-4 py-1 rounded-full text-sm">
                    {appliedJob.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppliedJobTable;
