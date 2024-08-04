import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/auth.js'; // Corrected path
import  crypto  from 'crypto';


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: true
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth',authRoute)

// Database connection
mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL, {
          
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error', error);
        process.exit(1); // Exit process with failure
    }
};

// Routes


app.get('/', (req, res) => {
    res.send('Hello from doctors');
});

// Start server

  
    app.listen(port, () => {
         
        console.log(`Server is running on port ${port}`);
        connectDB();
    });


