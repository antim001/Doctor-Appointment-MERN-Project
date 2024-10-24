import { useContext, useState } from 'react';
import { authContext } from '../../../context/AuthContext.jsx';
import userImg from '../../assets/image/doctor-img01.png';
import MyBooking from './MyBooking.jsx';
import Profile from './Profile.jsx';
import useGetProfile from '../../hooks/UseFetchData.jsx';
import { BASE_URL } from '../../config.js';
import Loading from '../../components/Loader/Loading.jsx'
import Error from '../../components/Error/Error.jsx'
const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState('bookings');
  const { data: userData, loading, error } = useGetProfile(`${BASE_URL}/users/profile/me`);
  console.log(userData, 'userdata');
  
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
        {loading && !error && <Loading/>}
        {error && !loading && <Error errMessage={error}/>}
        {
          !loading && !error && (
            <div className='grid md:grid-cols-3 gap-10'>
              <div className='pb-[50px] px-[30px] rounded-md'>
                <div className='flex items-center justify-center'>
                  <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-blue-500'>
                    <img src={userData.photo} alt=""  
                      className='w-full 
                      h-full 
                      rounded-full'/>
                  </figure>
                </div>
                <div className='text-center mt-4'>
                  <h3 className='text-[18px] leading-[30px] font-bold'>{userData.name}</h3>
                  <p className=' text-[15px] leading-6 font-medium'>{userData.email}</p>
                  <p className=' text-[15px] leading-6 font-medium'>
                    Blood Type:<span className='ml-2 text-[22px] leading-8'>{userData.bloodType}</span>
                  </p>
                </div>
                <div className='mt-[50px] md:mt-[100px] '>
                  <button onClick={handleLogout} className='w-full bg-[#181A1E] p-3 text-white text-[16px] leading-7 rounded-md'>Logout</button>
                 
                </div>
              </div>
              <div className='md:col-span-2 md:px-[30px]'>
                <div>
                  <button
                    onClick={() => {
                      setTab('bookings');
                    }}
                    className={`${tab === 'bookings' ? 'bg-green-300 text-white font-normal' : ''} p-2 mr-5 px-5 rounded-md font-semibold text-[16px] leading-7 border border-solid border-blue-500`}
                  >
                    My Bookings
                  </button>
                  <button
                    onClick={() => {
                      setTab('settings');
                    }}
                    className={`${tab === 'settings' ? 'bg-green-300 text-white font-normal' : ''} py-2 px-5 rounded-md font-semibold text-[16px] leading-7 border border-solid border-blue-500`}
                  >
                    Profile Settings
                  </button>
                </div>
                {
                  tab === 'bookings' && <MyBooking />
                }
                {
                  tab === "settings" && <Profile user={userData} />
                }
              </div>
            </div>
          )
        }
      </div>
    </section>
  );
};

export default MyAccount;
