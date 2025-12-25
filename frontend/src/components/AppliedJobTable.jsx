import React from "react";
import { useSelector } from "react-redux";

function AppliedJobTable() {
  const { allAppliedJobs } = useSelector((store) => store.job);

  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700 border border-green-300";
      case "rejected":
        return "bg-red-100 text-red-700 border border-red-300";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    }
  };

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
              <td colSpan="4" className="text-center py-6 text-gray-500">
                You haven't applied to any jobs yet
              </td>
            </tr>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <tr
                key={appliedJob._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-4 px-4">
                  {appliedJob.createdAt?.split("T")[0]}
                </td>

                <td className="py-4 px-4 font-medium">
                  {appliedJob.job?.title || "NA"}
                </td>

                <td className="py-4 px-4">
                  {appliedJob.job?.company?.name || "NA"}
                </td>

                <td className="py-4 px-4 text-right">
                  <span
                    className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-medium capitalize ${getStatusStyle(
                      appliedJob.status
                    )}`}
                  >
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
