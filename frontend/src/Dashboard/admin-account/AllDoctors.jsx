import {useState} from 'react'
import { BASE_URL } from '../../config.js';
import UseFetchData from "../../hooks/UseFetchData.jsx";
import Loader from '../../components/Loader/Loading.jsx';
import Error from '../../components/Error/Error.jsx';
import "../../assets/css/table.css";
import { toast } from "react-toastify";

const AllDoctors = () => {
  const [approveLoading, setApproveLoading] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(1);

  const { data: doctors, loading, error } = UseFetchData(`${BASE_URL}/doctors/all/docs`, [triggerFetch]);

  const approveDoctor = (id) => {
    setApproveLoading(true);

    fetch(`${BASE_URL}/doctors/approve/${id}`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => {
        if (data.status) toast.success(data.msg);
        else toast.error(data.msg);
      })
      .catch(err => toast.error(err));

    setApproveLoading(false);
    setTriggerFetch(!triggerFetch);
  }

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}


      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Profile image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Appointment fee</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {
              doctors.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={data.photo} style={{ width: 80 }} />
                  </td>
                  <td> {data.name}</td>
                  <td>{data.email}</td>
                  <td style={{ textTransform: "capitalize" }}>{data.specialization}</td>
                  <td>{data.ticketPrice} Tk</td>
                  <td style={{ textTransform: "capitalize" }}>{data.isApproved}</td>

                  <td>
                    {
                      (data.isApproved != "approved") &&
                      <button
                        className="btn btn-success"
                        onClick={() => approveDoctor(data._id)}
                      >
                        {approveLoading ? <Loader /> : "Approve"}
                      </button>
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AllDoctors;
