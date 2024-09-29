// BookingController.js
import Booking from '../models/BookingSchema.js';  // Assuming this is your Booking model
import Doctor from '../models/DoctorSchema.js';    // Assuming this is your Doctor model
import User from '../models/UserSchema.js';        // Assuming this is your User model

// Controller for approving an appointment
export const approveAppointment = async (req, res) => { 
  const bookingId = req.params.bookingId;  // Booking ID passed as URL param

  try {
    // Find and update the appointment in the database, and populate related data (doctor, user)
    const booking = await Booking.findByIdAndUpdate(
      bookingId, 
      { isApproved: true },   // Set isApproved to true
      { new: true }           // Return the updated booking document
    ).populate('doctor').populate('user');  // Populate doctor and user data

    // Check if the booking was found
    if (booking) {
      // Send the response with necessary data
      res.status(200).json({
        success: true,
        message: 'Appointment approved',
        doctorName: booking.doctor.name,           // Doctor's name
        appointmentDate: booking.appointmentDate,  // Appointment date
        patientEmail: booking.user.email,          // Patient's email
        patientName: booking.user.name             // Patient's name
      });
    } else {
      // If no booking was found
      res.status(404).json({ success: false, message: 'Appointment not found' });
    }
  } catch (error) {
    // Handle server errors
    console.error('Error approving appointment:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
