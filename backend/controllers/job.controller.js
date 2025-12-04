import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";


export const postJob = async (req, res) => {
    try {
        const {
            title, description, requirements, salary,
            location, jobType, experience, position, companyId
        } = req.body;

        const userId = req.id;

        // required fields check
        const requiredFields = [title, description, salary, location, jobType, experience, position, companyId];
        if (requiredFields.some(field => !field)) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        const newJob = await Job.create({
            title,
            description,
            requirements: Array.isArray(requirements) 
                ? requirements 
                : requirements.split(",").map(r => r.trim()),
            salary: Number(salary),
            location,
            jobType,
            experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully",
            success: true,
            job: newJob
        });

    } catch (error) {
        console.error("Error in postJob:", error.message);
        return res.status(500).json({ message: "Server error", success: false });
    }
};


export const getAlljob = async (req, res) => {
    try {
        const keyword = req.query.keyword;
        let query = {};

        if (keyword) {
            query = {
                $or: [
                    { title: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ]
            };
        }

        const jobs = await Job.find(query)
            .populate("company")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.error("Error in getAlljob:", error.message);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: 'applications',
            populate: {
                path: 'applicant',
                select: '_id name email',
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });

    } catch (error) {
        console.error("Error in getJobById:", error.message);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


export const getAdminJob = async (req, res) => {
    try {
        const adminId = req.id;

        const jobs = await Job.find({ created_by: adminId })
            .populate("company")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.error("Error in getAdminJob:", error.message);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};
