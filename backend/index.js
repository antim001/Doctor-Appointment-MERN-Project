import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/auth.js'; 
import userRoute from './routes/user.js';
import doctorRoute from './routes/doctor.js';
import reviewRoute from './routes/review.js';
import bookingRoute from './routes/booking.js'
import contactRoute from './routes/contact.js';
import approve from './routes/appointment.js'


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
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/doctors', doctorRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/bookings',bookingRoute)
app.use('/api/v1',contactRoute);
app.use('/api/v1/appointments', approve);


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

// Start server only after connecting to the database
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error('Failed to connect to MongoDB', error);
});
