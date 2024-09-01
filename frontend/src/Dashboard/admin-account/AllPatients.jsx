
import { BASE_URL } from '../../config.js';
import UseFetchData from "../../hooks/UseFetchData.jsx";
import Loader from '../../components/Loader/Loading.jsx';
import Error from '../../components/Error/Error.jsx';
import "../../assets/css/table.css";

const AllPatients = () => {
  const { data: users, loading, error } = UseFetchData(`${BASE_URL}/users`);

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
              <th>Blood type</th>
              <th>Gender</th>
            </tr>
          </thead>

          <tbody>
            {
              users.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={data.photo} style={{ width: 80 }} />
                  </td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.bloodType}</td>
                  <td style={{ textTransform: "capitalize" }}>{data.gender}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AllPatients;