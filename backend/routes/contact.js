import express from 'express';
import Contact from '../models/ContactSchema.js'
const router =express.Router();

router.post('/contact',async(req,res)=>{
    try{
        const contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message

        })
        await contact.save();
        return res.status(200).json({message:"Message submitted successfully,wait for our email"})
    }catch(err){
        res.status(500).json({ message: 'Error submitting contact form', error: error.message });
    }
})
export default router;