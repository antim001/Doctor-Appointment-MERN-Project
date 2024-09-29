import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config.js';
import emailjs from 'emailjs-com'; // Import EmailJS

const Appointments = ({ appointments }) => {
  console.log('Appointments:', appointments);

  const [updatedAppointments, setUpdatedAppointments] = useState(appointments);

  // Load approval statuses from localStorage when component mounts
  useEffect(() => {
    const approvedAppointments = JSON.parse(localStorage.getItem('approvedAppointments')) || [];
    setUpdatedAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        approvedAppointments.includes(appointment._id)
          ? { ...appointment, isApproved: true }
          : appointment
      )
    );
  }, []);

  // Function to send confirmation email
  const sendConfirmationEmail = async (patientEmail, patientName, doctorName, appointmentDate) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(patientEmail)) {
      alert('Invalid email address. Please check the patient\'s email.');
      return;
    }

    const templateParams = {
      patient_name: patientName,
      doctor_name: doctorName,
      appointment_date: appointmentDate,
      to_email: patientEmail,
    };

    try {
      await emailjs.send(
        'service_pxewoky',
        'template_pg467sn',
        templateParams,
        '9Z9N9hmPFYWlheOjt'
      );
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  };

  // Function to handle appointment approval
  const handleApprove = async (bookingId) => {
    try {
      const response = await axios.patch(`${BASE_URL}/appointments/approve/${bookingId}`);
      if (response.data.success) {
        const approvedAppointments = JSON.parse(localStorage.getItem('approvedAppointments')) || [];
        localStorage.setItem('approvedAppointments', JSON.stringify([...approvedAppointments, bookingId]));

        setUpdatedAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === bookingId
              ? { ...appointment, isApproved: true }
              : appointment
          )
        );

        const { doctorName, appointmentDate, patientEmail, patientName } = response.data;
        await sendConfirmationEmail(patientEmail, patientName, doctorName, appointmentDate);
        alert('Appointment approved and confirmation email sent to the patient!');
      }
    } catch (error) {
      console.error('Error approving appointment:', error);
      alert('Failed to approve appointment.');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Gender</th>
            <th className="px-4 py-3">Payment</th>
            <th className="px-4 py-3">Visit</th>
            <th className="px-4 py-3">Booked On</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {updatedAppointments?.map(item => (
            <tr key={item._id} className="border-b hover:bg-gray-100">
              <th className="px-4 py-4 text-gray-900 whitespace-nowrap flex items-center">
                <img src={item.user.photo} className="w-10 h-10 rounded-full" alt="" />
                <div className="pl-3">
                  <div className="text-base font-semibold">{item.user.name}</div>
                  <div className="text-sm text-gray-500">{item.user.email}</div>
                </div>
              </th>
              <td className="px-4 py-4">{item.user.gender}</td>
              <td className="px-4 py-4">
                {item.isPaid ? (
                  <span className="text-green-500">Paid</span>
                ) : (
                  <span className="text-red-500">Unpaid</span>
                )}
              </td>
              <td className="px-4 py-4">{item.ticketPrice}</td>
              <td className="px-4 py-4">
                {/* Display the appointment date if available, otherwise show 'No date provided' */}
                {item.appointmentDate 
                  ? `${new Date(item.appointmentDate).toLocaleDateString()} ${item.appointmentTime}`
                  : 'No date provided'}
              </td>
              <td className="px-4 py-4">
                {item.isApproved ? (
                  <span className="text-green-500">Approved</span>
                ) : (
                  <button
                    onClick={() => handleApprove(item._id)}
                    className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
