import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from "nodemailer";
const generateToken =user=>{
  return jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
  
}
export const register = async (req, res) => {
    const { name, email, password, role, photo, gender } = req.body;
    
    try {
        let user = null;

        // Check if user exists based on role
        if (role === 'patient') {
            user = await User.findOne({ email });
        } else if (role === 'doctor') {
            user = await Doctor.findOne({ email });
        }

        if (user) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create a new user based on role
        if (role === 'patient') {
            user = new User({
                name, email, photo, gender, role, password: hashedPassword
            });
        } else if (role === 'doctor') {
            user = new Doctor({
                name, email, photo, gender, role, password: hashedPassword
            });
        }

        // Save the user
        await user.save();
        res.status(200).json({ success: true, message: 'User successfully created' });
        
    } catch (error) {
        console.error('Error in register:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const login = async (req, res) => {
    const {email}=req.body;
    try {
        let user = null;
        const patient=await User.findOne({email})
        const doctor=await Doctor.findOne({email})
    if(patient){
        user=patient
    }
    if(doctor){
        user=doctor
    }
    //check if usere exist or not
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    //compare password
    const isPasswordMatch=await bcrypt.compare(req.body.password,user.password)
    if(!isPasswordMatch){
        return res.status(404).json({ status:false,message:"invalid credentials"})
    }
   //get token
   const token=generateToken(user);
   const {password,role,appointments,...rest}=user._doc
   res.status(200).json({status:true,message:"successfully login",token,data:{...rest},role})
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ success: false, message: 'failed to login' });
    }
}
export const sendResetPassMail = async (req, res) => {
    try {
        let user = null;
        const patient = await User.findOne({ email: req.body.email });
        const doctor = await Doctor.findOne({ email: req.body.email });

        if (patient) user = patient;
        if (doctor) user = doctor;

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        else {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "10m", });

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD_APP_EMAIL,
                },
            });

            // Email configuration
            const mailOptions = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: "Reset Password",
                html: `<h1>Reset Your Password</h1>
    <p>Click on the following link to reset your password:</p>
    <a href="https://doctor-appointment-mern-project-frontend.vercel.app/reset-password/${token}">https://doctor-appointment-mern-project-frontend.vercel.app/reset-password/${token}</a>
    <p>The link will expire in 10 minutes.</p>
    <p>If you didn't request a password reset, please ignore this email.</p>`,
            };

            // Send the email
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    return res.status(500).send({ message: "Something went wrong" });
                }

                res.status(200).send({ message: "Check your mail inbox" });
            });
        }
    } catch {
        return res.status(500).send({ message: "Something went wrong" });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const decodedToken = jwt.verify(
            req.body.token,
            process.env.JWT_SECRET_KEY
        );

        if (!decodedToken) {
            return res.status(401).send({ message: "Invalid operation" });
        }

        const salt = await bcrypt.genSalt(10);
        req.body.pass = await bcrypt.hash(req.body.pass, salt);

        await User.updateOne(
            { _id: decodedToken.userId },
            {
                $set: { password: req.body.pass }
            }
        );

        res.status(200).send({ message: "Password reset" });
    } catch {
        res.status(500).send({ message: "Something went wrong" });
    }
};