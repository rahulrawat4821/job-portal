import mongoose from "mongoose";
import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";

// CREATE JOB (ADMIN)
export const postJob = async (req, res) => {
  try {
    const {
      title, description, requirements, salary,
      location, jobType, experience, position, companyId
    } = req.body;

    const userId = req.id; // must come from isAuthenticated middleware

    if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    if (isNaN(salary) || isNaN(experience) || isNaN(position)) {
      return res.status(400).json({ message: "Salary, experience and position must be numbers", success: false });
    }

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ message: "Invalid company ID", success: false });
    }

    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ message: "Company not found", success: false });

    const requirementsArray = Array.isArray(requirements)
      ? requirements
      : requirements.split(",").map(r => r.trim()).filter(Boolean);

    if (requirementsArray.length === 0) return res.status(400).json({ message: "Requirements cannot be empty", success: false });

    const newJob = await Job.create({
      title,
      description,
      requirements: requirementsArray,
      salary: Number(salary),
      location,
      jobType,
      experience: Number(experience),
      position: Number(position),
      company: companyId,
      created_by: userId
    });

    return res.status(201).json({ success: true, message: "Job created successfully", job: newJob });

  } catch (error) {
    console.error("Error in postJob:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// GET ALL JOBS (Public)
export const getAlljob = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    let query = {};
    if (keyword.trim() !== "") {
      query = { $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]};
    }

    const jobs = await Job.find(query).populate("company").sort({ createdAt: -1 });

    return res.status(200).json({ success: true, jobs });

  } catch (error) {
    console.error("Error in getAlljob:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// GET JOB BY ID (Public)
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid job ID", success: false });

    const job = await Job.findById(id)
      .populate("company")
      .populate({ path: "applications", populate: { path: "applicant", select: "name email" } });

    if (!job) return res.status(404).json({ message: "Job not found", success: false });

    return res.status(200).json({ success: true, job });

  } catch (error) {
    console.error("Error in getJobById:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// GET ADMIN JOBS (Protected)
export const getAdminJob = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate("company").sort({ createdAt: -1 });

    return res.status(200).json({ success: true, jobs });

  } catch (error) {
    console.error("Error in getAdminJob:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
