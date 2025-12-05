import express from "express";
import { isAuthenticated } from "../middlewares/authmiddleware.js";
import { applyJob, getApplicant, getAppliedJob, updateStatus } from "../controllers/application.controller.js";

const router = express.Router();

router.get("/apply/:id",isAuthenticated, applyJob);
router.get("/get",isAuthenticated,getAppliedJob);
router.get("/:id/applicants",isAuthenticated,getApplicant);
router.post("/status/:id/update",isAuthenticated,updateStatus)


export default router;