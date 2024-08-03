import express from 'express';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config()
const app = express()
const port=process.env.PORT || 8000;

const corsOptions={
    origin:true
}
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
//database connection
mongoose.set('strictQuery',false)
const connectDB=async()=>{
    try{
 await mongoose.connect(process.env.MONGOURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
 })
 console.log('MongoDB connected')
    }catch(error){
console.log("Mongodb connection error")
    }
}

app.get('/',(req,res)=>{
    res.send('Hello  from doctors')
})
app.listen(port,()=>{
    connectDB()
    console.log(`server is running on port ${port}`)
})