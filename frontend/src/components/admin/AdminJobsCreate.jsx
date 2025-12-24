import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useGetAllCompanies from "../../Hooks/useGetAllCompanies";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/context";
import { toast } from "sonner";

const AdminJobsCreate = () => {
  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(true); // ✅ loading state
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    skills: "",
    experience: "",
    salary: "",
    location: "",
    jobType: "",
    openings: "",
    companyId: "",
  });

  // fetch companies on mount
  useGetAllCompanies();

  // watch for companies to finish loading
  useEffect(() => {
    if (companies) {
      setLoading(false);
    }
  }, [companies]);

  const changeHandler = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!jobData.companyId) {
      return toast.error("Please select a company");
    }

    try {
      const res = await axios.post(
        `${JOB_API_END_POINT}/post`,
        {
          title: jobData.title,
          description: jobData.description,
          requirements: jobData.skills.split(",").map((s) => s.trim()),
          experience: Number(jobData.experience),
          salary: Number(jobData.salary),
          location: jobData.location,
          jobType: jobData.jobType,
          position: Number(jobData.openings),
          companyId: jobData.companyId,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setJobData({
          title: "",
          description: "",
          skills: "",
          experience: "",
          salary: "",
          location: "",
          jobType: "",
          openings: "",
          companyId: "",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Job creation failed");
      console.error(error);
    }
  };

  if (loading) return <p className="text-center py-10">Loading companies...</p>;

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-6">Create New Job</h1>

      <form onSubmit={submitHandler} className="grid grid-cols-2 gap-6">
        <input name="title" value={jobData.title} onChange={changeHandler} placeholder="Job Title" className="border p-3 rounded" />
        <input name="location" value={jobData.location} onChange={changeHandler} placeholder="Location" className="border p-3 rounded" />
        <input name="skills" value={jobData.skills} onChange={changeHandler} placeholder="Skills (comma separated)" className="border p-3 rounded col-span-2" />
        <textarea name="description" value={jobData.description} onChange={changeHandler} placeholder="Job Description" className="border p-3 rounded col-span-2" rows={4} />
        <input name="experience" value={jobData.experience} onChange={changeHandler} placeholder="Experience (years)" className="border p-3 rounded" />
        <input name="salary" value={jobData.salary} onChange={changeHandler} placeholder="Salary" className="border p-3 rounded" />

        <select name="jobType" value={jobData.jobType} onChange={changeHandler} className="border p-3 rounded">
          <option value="">Select Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
        </select>

        <input name="openings" value={jobData.openings} onChange={changeHandler} placeholder="Number of Openings" className="border p-3 rounded" />

        <select name="companyId" value={jobData.companyId} onChange={changeHandler} className="border p-3 rounded col-span-2" required>
          <option value="">Select Company</option>
          {companies?.map((company) => (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          ))}
        </select>

        <button type="submit" className="col-span-2 bg-black text-white py-3 rounded-md hover:bg-gray-800">
          Create Job
        </button>
      </form>
    </div>
  );
};

export default AdminJobsCreate;
