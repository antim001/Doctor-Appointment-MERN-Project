import jwt from 'jsonwebtoken';
import Doctor from '../models/DoctorSchema.js';
import User from '../models/UserSchema.js';

// Middleware to authenticate users based on roles
export const authenticate = (roles) => async (req, res, next) => {
    // Get token from header
    const authToken = req.headers.authorization;

    // Check if token exists and starts with 'Bearer'
    if (!authToken || !authToken.startsWith('Bearer')) {
        return res.status(401).json({ success: false, message: 'Please provide a valid token' });
    }

    try {
        // Split the token from 'Bearer ' part
        const token = authToken.split(' ')[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Attach userId and role to request object
        req.userId = decoded.id;
        req.role = decoded.role;

        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token has expired' });
        }
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

// Middleware to restrict access based on roles
export const restrict = (roles) => async (req, res, next) => {
    const userId = req.userId;

    try {
        // Find the user by ID in User and Doctor collections
        const user = await User.findById(userId) || await Doctor.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        // Check if user's role is included in allowed roles
        if (!roles.includes(user.role)) {
            return res.status(403).json({ success: false, message: 'You are not authorized' });
        }

        next();
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
