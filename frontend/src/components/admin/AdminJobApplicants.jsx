import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const AdminJobApplicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/v1/application/${jobId}/applicants`,
        { withCredentials: true }
      );

      if (res.data.success) {
        // Update according to your backend response structure
        setApplicants(res.data.job?.applications || res.data.applications || []);
      } else {
        toast.error(res.data.message || "Failed to fetch applicants");
      }
    } catch (error) {
      console.error("Fetch applicants error:", error);
      toast.error(error.response?.data?.message || "Failed to fetch applicants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const handleStatusUpdate = async (appId, status) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/application/status/${appId}/update`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setApplicants(prev =>
          prev.map(app =>
            app._id === appId ? { ...app, status: status } : app
          )
        );
      } else {
        toast.error(res.data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Update status error:", error);
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) {
    return <p className="text-center py-6">Loading applicants...</p>;
  }

  if (applicants.length === 0) {
    return <p className="text-center py-6 text-gray-500">No applicants found for this job.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Applicants ({applicants.length})</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b">#</th>
              <th className="py-3 px-4 border-b">Photo</th>
              <th className="py-3 px-4 border-b">Full Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Contact</th>
              <th className="py-3 px-4 border-b">Resume</th>
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((app, index) => {
              const applicant = app.applicant || {};
              return (
                <tr key={app._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{index + 1}</td>
                  <td className="py-3 px-4 border-b">
                    {applicant.profile?.profilePhoto ? (
                      <img
                        src={applicant.profile.profilePhoto}
                        alt={applicant.fullname}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : "N/A"}
                  </td>
                  <td className="py-3 px-4 border-b">{applicant.fullname || "N/A"}</td>
                  <td className="py-3 px-4 border-b">{applicant.email || "N/A"}</td>
                  <td className="py-3 px-4 border-b">{applicant.phoneNumber || "N/A"}</td>
                  <td className="py-3 px-4 border-b">
                    {applicant.profile?.resume ? (
                      <a
                        href={applicant.profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View Resume
                      </a>
                    ) : "N/A"}
                  </td>

                  <td className="py-3 px-4 border-b">{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4 border-b relative">
                    <select
                      value={app.status || "pending"}
                      onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                      className="border px-2 py-1 rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminJobApplicants;
