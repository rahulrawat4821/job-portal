import express from 'express';
import { isAuthenticated } from '../middlewares/authmiddleware.js';
import { getCompany, getCompanyByID, registerCompany, updateCompany } from '../controllers/company.controller.js';


const router = express.Router();

router.post('/register',isAuthenticated, registerCompany);
router.post('/get',isAuthenticated, getCompany);
router.route('/get/:id',isAuthenticated, getCompanyByID);
router.put('/update/:id',isAuthenticated, updateCompany);



export default router;