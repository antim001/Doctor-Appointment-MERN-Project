import express from 'express'
import { authenticate } from './../auth/verifyToken.js';
import { getCheckoutSession, getAllBookings, getBooking } from '../controllers/bookingController.js'

const router = express.Router()
router.get('/', getAllBookings);
router.get('/:id', getBooking);
router.post('/checkout-session/:doctorId', authenticate, getCheckoutSession)


export default router