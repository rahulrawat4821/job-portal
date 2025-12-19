import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { setSingleJob } from "../redux/jobSlice";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "../utils/context";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);

  const [isApplied, setIsApplied] = useState(false);

  // ✅ APPLY FOR JOB (POST)
  const applyForJob = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);

        // update redux state instantly
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [
              ...(singleJob?.applications || []),
              { applicant: user?._id }
            ]
          })
        );

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Apply job error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // ✅ FETCH SINGLE JOB
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));

          const applied = res.data.job.applications?.some(
            app => app.applicant === user?._id
          );

          setIsApplied(applied);
        }
      } catch (error) {
        console.log("Job fetch error:", error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{singleJob?.title}</h1>

          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-sm font-medium">
              {singleJob?.position} Positions
            </span>
            <span className="text-red-600 bg-red-100 px-3 py-1 rounded-full text-sm font-medium">
              {singleJob?.jobType}
            </span>
            <span className="text-purple-700 bg-purple-100 px-3 py-1 rounded-full text-sm font-medium">
              {singleJob?.salary} LPA
            </span>
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={applyForJob}
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

      <hr className="my-6" />

      {/* Job Description */}
      <h2 className="text-lg font-semibold mb-4">Job Description</h2>

      <div className="space-y-3 text-gray-700">
        <p><b>Role:</b> {singleJob?.title}</p>
        <p><b>Location:</b> {singleJob?.location}</p>
        <p><b>Description:</b> {singleJob?.description}</p>
        <p><b>Experience:</b> {singleJob?.experience} yrs</p>
        <p><b>Salary:</b> {singleJob?.salary} LPA</p>
        <p><b>Total Applicants:</b> {singleJob?.applications?.length || 0}</p>
        <p><b>Posted Date:</b> {singleJob?.createdAt && new Date(singleJob.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default JobDescription;
