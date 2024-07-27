const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel'); // Ensure the User model is correctly defined and imported
const jwt=require("jsonwebtoken");
// Register route
router.post('/register', async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      res.status(200).send({ message: 'User already exists', success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send({ message: 'User created successfully', success: true });
  } catch (error) {
   
    res.status(500).send({ message: 'Server error', success: false });
  }
});

// Login route (currently not implemented)
router.post('/login', async (req, res) => {
  try {
    const user=await User.findOne({email:req.body.email});
    if(!user){
      return res.status(200).send({message:"user is not exist",success:false})
    }
    const ismatch=await bcrypt.compare(req.body.password,user.password)
  if(!ismatch){
    return res.status(200).send({message:"password is incorrect",success:false})
  }else{
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{
      expiresIn:"1d"
    })
    res.status(200).send({message:"Login successful",success:true,data:token})
  }
   } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error', success: false });
  }
});

module.exports = router;
