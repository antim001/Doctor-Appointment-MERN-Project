import express from 'express';
import {register,login,sendResetPassMail, resetPassword } from '../controllers/authController.js';
const router =express.Router();
router.post('/register',register);
router.post('/login',login)
router.post('/reset_pass_mail', sendResetPassMail)
router.post('/reset-pass', resetPassword)
export default router;