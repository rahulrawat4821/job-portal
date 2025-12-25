import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// Apply to job
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated", success: false });
    }

    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required.", success: false });
    }

    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job", success: false });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    const newApplication = await Application.create({ job: jobId, applicant: userId });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({ message: "Job applied successfully.", success: true });
  } catch (error) {
    console.error("Apply Job Error:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Get jobs applied by user
export const getAppliedJob = async (req, res) => {
  try {
    const userId = req.id; // ✅ CORRECT

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const applications = await Application.find({
      applicant: userId,
    })
      .populate({
        path: "job",
        populate: { path: "company" },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json(applications);
  } catch (error) {
    console.error("getAppliedJob error:", error);
    return res.status(500).json({ message: "Failed to fetch applied jobs" });
  }
};




// Get all applicants for a job (for admin/recruiter)
export const getApplicant = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId)
      .populate({
        path: "applications",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "applicant",
          select: "_id fullname email phoneNumber profile" // include fullname and profile
        }
      });


    if (!job) {
      return res.status(404).json({ message: "Job not found.", success: false });
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return res.status(500).json({ message: "Server error.", success: false, error: error.message });
  }
};

// Update application status (admin/recruiter)
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({ message: "Status is required.", success: false });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found.", success: false });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({ message: "Status updated successfully.", success: true, application });
  } catch (error) {
    console.error("Update Status Error:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
