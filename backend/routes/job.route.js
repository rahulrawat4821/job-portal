import express from "express";
import { isAuthenticated } from "../middlewares/authmiddleware.js";
import { getAdminJob, getAlljob, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

// Admin creates a new job
router.post("/post", isAuthenticated, postJob);

// Public route for fetching jobs (no auth required)
router.get("/get", getAlljob);

// Admin jobs (requires authentication)
router.get("/getadminjobs", isAuthenticated, getAdminJob);

// Get job by ID (optional auth, but can keep protected)
router.get("/get/:id", getJobById);

export default router;
