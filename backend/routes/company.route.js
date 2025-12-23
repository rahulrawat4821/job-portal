import express from 'express';
import { isAuthenticated } from '../middlewares/authmiddleware.js';
import { getCompany, getCompanyByID, registerCompany, updateCompany } from '../controllers/company.controller.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/register', isAuthenticated, registerCompany);
router.get('/get', isAuthenticated, getCompany);
router.get('/get/:id', isAuthenticated, getCompanyByID);
router.put('/update/:id', isAuthenticated, upload.single("file"), updateCompany);

export default router;
