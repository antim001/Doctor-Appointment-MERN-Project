import {useContext} from 'react';
import { BiMenu } from 'react-icons/bi';
import {authContext} from '../../../context/AuthContext.jsx'
import {useNavigate} from 'react-router-dom'
const Tabs = ({ tab, setTab }) => {
    const {dispatch} =useContext(authContext)
    const navigate = useNavigate()
    const handleLogout=()=>{
        dispatch({type:'LOGOUT'})
        navigate('/')
    }
  return (
    <div>
      <span className='lg:hidden'>
        <BiMenu className='w-6 h-6 cursor-pointer' />
      </span>
      <div className='hidden lg:flex flex-col p-[30px] bg-white shadow-lg items-center h-max rounded-md'>
        <button
          onClick={() => setTab('overview')}
          className={`${tab === 'overview' ? 'bg-indigo-100 text-black' : 'bg-transparent text-black'} w-full btn btn-primary mt-2 mb-2 rounded-md`}>
          Overview
        </button>
        <button
          onClick={() => setTab('appointments')}
          className={`${tab === 'appointments' ? 'bg-indigo-100 text-black' : 'bg-transparent text-black'} w-full btn btn-primary mt-0 mb-2 rounded-md`}>
          Appointments
        </button>
        <button
          onClick={() => setTab('settings')}
          className={`${tab === 'settings' ? 'bg-indigo-100 text-black' : 'bg-transparent text-black'} w-full btn btn-primary mt-0 rounded-md`}>
          Profile
        </button>
        <div className='mt-[50px] md:mt-[100px] w-full'>
                  <button 
                  onClick={handleLogout} 
                  className='w-full bg-[#181A1E] p-3 text-white text-[16px] leading-7 rounded-md'>Logout</button>
                  <button className='w-full bg-red-600 text-white mt-4 p-3 text-[16px] leading-7 rounded-md'>Delete Account</button>
                </div>
      </div>
    </div>
  );
};

export default Tabs;
