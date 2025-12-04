import express from 'express';
import { isAuthenticated } from '../middlewares/authmiddleware.js';
import { getAdminJob, getAlljob, getJobById, postJob } from '../controllers/job.controller.js';

const router = express.Router();

router.post("/post",isAuthenticated, postJob);
router.get("/get",isAuthenticated, getAlljob);
router.get("/getadminjobs",isAuthenticated, getAdminJob);
router.get("/get/:id",isAuthenticated, getJobById);

export default router;