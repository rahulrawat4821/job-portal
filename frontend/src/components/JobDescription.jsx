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

  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [isApplied, setIsApplied] = useState(false);

  const applyForJob = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [
              ...(singleJob?.applications || []),
              { applicant: user?._id },
            ],
          })
        );
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

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
            (app) => app.applicant?._id === user?._id
          );

          setIsApplied(applied);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{singleJob?.title}</h1>

          <div className="flex flex-wrap gap-2 mt-3">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              {singleJob?.position} Positions
            </span>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
              {singleJob?.jobType}
            </span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
              {singleJob?.salary} LPA
            </span>
          </div>
        </div>

        <button
          onClick={applyForJob}
          disabled={isApplied}
          className={`px-6 py-2 rounded-lg text-white font-semibold ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-indigo-500"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </button>
      </div>

      <hr className="my-6" />

      {/* Description */}
      <h2 className="text-lg font-semibold mb-4">Job Description</h2>

      <div className="space-y-3 text-gray-700">
        <p><b>Role:</b> {singleJob?.title}</p>
        <p><b>Location:</b> {singleJob?.location}</p>
        <p><b>Description:</b> {singleJob?.description}</p>
        <p><b>Experience:</b> {singleJob?.experience} years</p>
        <p><b>Salary:</b> {singleJob?.salary} LPA</p>
        <p><b>Total Applicants:</b> {singleJob?.applications?.length || 0}</p>
      </div>

      {/* Skills */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Skills Required</h3>
        <div className="flex flex-wrap gap-2">
          {singleJob?.requirements?.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDescription;

