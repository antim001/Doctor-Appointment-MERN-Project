import express from 'express'
import {approveAppointment}  from '../controllers/appointmentController.js'; // Import the controller

const router = express.Router();

// Route for approving an appointment
router.patch('/approve/:bookingId', approveAppointment);
export default router;
