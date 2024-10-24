import React, { useState } from 'react';
import { BASE_URL } from '../../config.js';
import UseFetchData from "../../hooks/UseFetchData.jsx";
import Loader from '../../components/Loader/Loading.jsx';
import Error from '../../components/Error/Error.jsx';
import "../../assets/css/table.css";
import { Link } from 'react-router-dom';

const Appointments = () => {
  const { data: bookings, loading, error } = UseFetchData(`${BASE_URL}/bookings`);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter bookings by patient name
  const filteredBookings = bookings.filter(booking =>
    booking.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}

      {!loading && !error && (
        <>
          <input
            type="text"
            placeholder="Search by patient name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
          />

          {filteredBookings.length === 0 ? (
            <p>Sorry, no patient found for search.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Doctor name</th>
                  <th>Patient name</th>
                  <th>Appointment time</th>
                  <th>Appointment fee</th>
                  <th>Payment status</th>
                  <th>Appointment status</th>
                  <th>Invoice</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredBookings.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>Dr. {data.doctor.name}</td>
                      <td>{data.user.name}</td>
                      <td>{data.appointmentDate} at {data.appointmentTime}</td>
                      <td>{data.ticketPrice} Tk</td>
                      <td>{data.isPaid ? "Paid" : "Not paid yet"}</td>
                      <td style={{ textTransform: "capitalize" }}>{data.status}</td>
                      <td>
                        <Link to={`/print-invoice/${data._id}`} className="btn btn-success">Click here</Link>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default Appointments;
