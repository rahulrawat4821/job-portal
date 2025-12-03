import express from 'express';
import { login, logout, register, updateProfile } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/authmiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/profile/update', isAuthenticated, updateProfile);
router.get('/logout', logout);

export default router;