import { useContext, useState } from 'react';
import { BiMenu, BiX } from 'react-icons/bi';
import { authContext } from '../../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Tabs = ({ tab, setTab }) => {
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTab = (tabName) => {
    setTab(tabName);
    setIsMenuOpen(false); // Close menu on tab selection for mobile
  };

  return (
    <div className="relative">
      <span className='lg:hidden'>
        {isMenuOpen ? (
          <BiX className='w-6 h-6 cursor-pointer' onClick={toggleMenu} />
        ) : (
          <BiMenu className='w-6 h-6 cursor-pointer' onClick={toggleMenu} />
        )}
      </span>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className='absolute top-[40px] left-0 flex flex-col p-[30px] bg-white shadow-lg items-center h-max rounded-md z-50'>
          <button
            onClick={() => toggleTab('overview')}
            className={`${tab === 'overview' ? 'bg-indigo-100 text-black' : 'bg-transparent text-black'} w-full btn btn-primary mt-2 mb-2 rounded-md`}>
            Overview
          </button>

          <button
            onClick={() => toggleTab('appointments')}
            className={`${tab === 'appointments' ? 'bg-indigo-100 text-black' : 'bg-transparent text-black'} w-full btn btn-primary mt-0 mb-2 rounded-md`}>
            Appointments
          </button>

          <button
            onClick={() => toggleTab('allDoctors')}
            className={`${tab === 'allDoctors' ? 'bg-indigo-100 text-black' : 'bg-transparent text-black'} w-full btn btn-primary mt-0 mb-2 rounded-md`}>
            All Doctors
          </button>

          <button
            onClick={() => toggleTab('allPatients')}
            className={`${tab === 'allPatients' ? 'bg-indigo-100 text-black' : 'bg-transparent text-black'} w-full btn btn-primary mt-0 mb-2 rounded-md`}>
            All Patients
          </button>

          <div className='mt-[50px] md:mt-[100px] w-full'>
            <button
              onClick={handleLogout}
              className='w-full bg-[#181A1E] p-3 text-white text-[16px] leading-7 rounded-md'>
              Logout
            </button>
            
          </div>
        </div>
      )}

      {/* Desktop menu */}
      <div className='hidden lg:flex flex-col p-[30px] bg-white shadow-lg items-center h-max rounded-md'>
        <button
          onClick={() => toggleTab('overview')}
          className={`${tab === 'overview' ? 'bg-indigo-100 text-black' : 'bg-transparent text-black'} w-full btn btn-primary mt-2 mb-2 rounded-md`}>
          Overview
        </button>

        <button
          onClick={() => toggleTab('appointments')}
          className={`${tab === 'appointments' ? 'bg-indigo-100 text-black' : 'bg-transparent text-black'} w-full btn btn-primary mt-0 mb-2 rounded-md`}>
          Appointments
        </button>

        <button
          onClick={() => toggleTab('allDoctors')}
          className={`${tab === 'allDoctors' ? 'bg-indigo-100 text-black' : 'bg-transparent text-black'} w-full btn btn-primary mt-0 mb-2 rounded-md`}>
          All Doctors
        </button>

        <button
          onClick={() => toggleTab('allPatients')}
          className={`${tab === 'allPatients' ? 'bg-indigo-100 text-black' : 'bg-transparent text-black'} w-full btn btn-primary mt-0 mb-2 rounded-md`}>
          All Patients
        </button>

        <div className='mt-[50px] md:mt-[100px] w-full'>
          <button
            onClick={handleLogout}
            className='w-full bg-[#181A1E] p-3 text-white text-[16px] leading-7 rounded-md'>
            Logout
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default Tabs;
