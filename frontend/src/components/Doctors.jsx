import DoctorCard from '../components/DoctorCard.jsx';
import { BASE_URL } from '../config.js';
import UseFetchData from '../hooks/UseFetchData.jsx';
import Loader from '../components/Loader/Loading.jsx';
import Error from '../components/Error/Error.jsx';

const Doctors = () => {
  const { data: doctors, loading, error } = UseFetchData(`${BASE_URL}/doctors`);

  return (
    <>
      {loading && <Loader />}
      {error && <Error />}
      {!loading && !error && (
        <div className='xl:w-[1200px] mx-auto p-8 md:gap-5'>
          <h2 className='text-center'>Our Great Doctors</h2>
          <p className='text-center'>
            World-class care for everyone. Our health system offers unmatched, expert health care.
          </p>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
            {doctors.slice(0, 3).map(doctor => (
              <DoctorCard doctor={doctor} key={doctor._id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Doctors;
