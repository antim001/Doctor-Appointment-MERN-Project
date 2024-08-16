import UseFetchData from '../../hooks/UseFetchData.jsx';
import { BASE_URL } from '../../config.js';
import DoctorCard from './../../components/DoctorCard';
import Loading from '../../components/Loader/Loading.jsx';
import Error from '../../components/Error/Error.jsx';

const MyBooking = () => {
    const { data: appointments, loading, error } = UseFetchData(`${BASE_URL}/users/appointments/my-appointments`);

    return (
        <div>
            {loading && !error && <Loading />}
            {error && !loading && <Error errMessage={error.message} />}
            {!loading && !error && (
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    {appointments.map(doctor => (
                        <DoctorCard doctor={doctor} key={doctor._id} />
                    ))}
                </div>
            )}

            {!loading && !error && appointments.length === 0 && (
                <h2 className='mt-5 text-center leading-7 text-[20px] font-semibold text-cyan-400'>You did not book any doctor yet!</h2>
            )}
        </div>
    );
}

export default MyBooking;
