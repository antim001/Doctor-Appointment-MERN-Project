import Review from '../models/ReviewSchema.js';
import Doctor from '../models/DoctorSchema.js';

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.status(200).json({ success: true, message: "successful", data: reviews });
  } catch (err) {
    res.status(404).json({ success: false, message: "not found" });
  }
};

// Create review
export const createReview = async (req, res) => {
  try {
    // Fixing the reference from req.body to req.body and setting default values
    const doctorId = req.body.doctor || req.params.doctorId;
    const userId = req.body.user || req.userId;

    // Log the incoming data for debugging
    console.log("Creating review for doctor:", doctorId);
    console.log("User submitting the review:", userId);

    // Create the new review
    const newReview = new Review({ ...req.body, doctor: doctorId, user: userId });

    // Save the review
    const savedReview = await newReview.save();
    console.log("Review saved successfully:", savedReview);

    // Update the doctor's review list
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { $push: { reviews: savedReview._id } },
      { new: true } // Return the updated doctor document
    );

    // Check if the doctor was found and updated
    if (!updatedDoctor) {
      throw new Error("Doctor not found after review creation");
    }

    console.log("Doctor updated successfully:", updatedDoctor);
    res.status(200).json({ success: true, message: "Review submitted successfully", data: savedReview });

  } catch (err) {
    console.error("Error during review creation:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
