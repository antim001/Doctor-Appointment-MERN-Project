
import { BASE_URL } from '../../config.js';
import UseFetchData from "../../hooks/UseFetchData.jsx";
import Loader from '../../components/Loader/Loading.jsx';
import Error from '../../components/Error/Error.jsx';
import "../../assets/css/table.css";
import { Link } from 'react-router-dom';

const Appointments = () => {
  const { data: bookings, loading, error } = UseFetchData(`${BASE_URL}/bookings`);

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}

      {!loading && !error && (
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
          {console.log(bookings)}
          <tbody>
            {
              bookings.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>Dr. {data.doctor.name}</td>
                  <td>{data.user.name}</td>
                  <td>{data.updatedAt}</td>
                  <td>{data.ticketPrice} Tk</td>
                  <td>{data.isPaid ? "Paid" : "Not paid yet"}</td>
                  <td style={{ textTransform: "capitalize" }}>{data.status}</td>
                  <td><Link to={`/print-invoice/${data._id}`} className="btn btn-success">Click here</Link></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Appointments;
