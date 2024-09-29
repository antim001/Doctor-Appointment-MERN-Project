import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import Booking from '../models/BookingSchema.js'
import Stripe from 'stripe';


export const getCheckoutSession = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId)
    const user = await User.findById(req.userId)
    const isAlreadyAppointed = await Booking.findOne({ doctor: req.params.doctorId, user: req.userId, appointmentDate: req.body.appointmentDate, appointmentTime: req.body.appointmentTime });

    if (isAlreadyAppointed != null) {
      res.status(500).json({ success: false, message: "Appointment schedule is not empty! " });
    }
    else {
      // create stripe chekout session
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
        cancel_url: `${req.protocol}://${req.get('host')}/doctors/${doctor.id}`,
        customer_email: user.email,
        client_reference_id: req.params.doctorId,
        line_items: [
          {
            price_data: {
              currency: 'bdt',
              unit_amount: doctor.ticketPrice * 100,
              product_data: {
                name: doctor.name,
                description: doctor.bio,
                images: [doctor.photo]
              }
            },
            quantity: 1
          }
        ]
      })

      //create new bookings
      const booking = new Booking({
        doctor: doctor._id,
        user: user._id,
        ticketPrice: doctor.ticketPrice,
        appointmentDate: req.body.appointmentDate,
        appointmentTime: req.body.appointmentTime,
        session: session.id
      })
      await booking.save()
      res.status(200).json({ success: true, message: 'successfully paid', session })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: "Error creating checkout session" })
  }
}

export const getBooking = async (req, res) => {
  try {
    const data = await Booking.find({ _id: req.params.id });
    res.status(200).json({
      status: 1,
      data
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      msg: "Something went wrong"
    });
  }
}

export const getAllBookings = async (req, res) => {
  try {
    const data = await Booking.find();
    res.status(200).json({
      status: 1,
      data
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      msg: "Something went wrong"
    });
  }
}