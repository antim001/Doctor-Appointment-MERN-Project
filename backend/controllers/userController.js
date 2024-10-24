import User from '../models/UserSchema.js';
import Booking from '../models/BookingSchema.js'
import Doctor from '../models/DoctorSchema.js'
import bcrypt from 'bcryptjs';
export const updateRole = async (req, res) => {
  try {
    const updatedUser = await User.updateOne({
      email: "admin@gmail.com"
    }, { $set: { role: "admin" } })
    res.status(200).json({ success: true, message: "Successfully Updated" })
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to update", })
  }
}

export const updateUser = async (req, res) => {
  const id = req.params.id;

  // If password is provided, hash it
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "Successfully Updated", data: updatedUser });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};


export const deleteUser = async (req, res) => {
  const id = req.params.id
  try {
    const updatedUser = await User.findByIdAndDelete(id)
    res.status(200).json({ success: true, message: "Successfully deleted", })
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to delete", })
  }
}

export const getSingleUser = async (req, res) => {
  const id = req.params.id
  try {
    const user = await User.findById(id).select('-password')
    res.status(200).json({ success: true, message: "user found", data: user })
  } catch (err) {
    res.status(404).json({ success: false, message: "no user", })
  }
}

export const getAllUser = async (req, res) => {
  const id = req.params.id
  try {
    const users = await User.find({}).select('-password')
    res.status(200).json({ success: true, message: "users found", data: users })
  } catch (err) {
    res.status(404).json({ success: false, message: "users not found" })
  }
}

export const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ success: false, message: "user not found" })
    }
    const { password, ...rest } = user._doc
    res.status(200).json({ success: true, message: 'profile info is getting', data: { ...rest } })
  } catch (err) {
    res.status(500).json({ success: false, message: "something went wrong,can not get" })
  }
}

export const getMyAppointments = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId })
    const doctorIds = bookings.map(el => el.doctor.id)
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select('-password')
    res.status(200).json({ success: true, message: "Appointments are getting", data: doctors })
  } catch (err) {
    res.status(500).json({ success: false, message: "something went wrong" })
  }
}