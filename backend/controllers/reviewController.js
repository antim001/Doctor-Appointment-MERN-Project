import Review from '../models/ReviewSchema.js';
import Doctor from '../models/DoctorSchema.js';

export const getAllReviews=async(req,res)=>{
   try{
  const reviews=await Review.find({})
  res.status(200).json({success:true,message:"successful",data:reviews})
   } catch(err){
     res.status(404).json({success:false,message:"not found"})
   }
};
//create review
export const createReview=async(req,res)=>{
    if(!res.body.doctor) req.body.doctor =req.params.doctorId
    if(!res.body.doctor) req.body.doctor =req.userId
const newReview= new Review(req.body)
try{
   const savedReview=await newReview.save()
   await Doctor.findByIdAndUpdate(req.body.doctor,{
    $push:{reviews:savedReview._id}
   })
   res.status(200).json({success:true,message:"Review submitted successfully",data:savedReview})
}catch(err){
 res.status(500).json({success:false,message:err.message})
}
}