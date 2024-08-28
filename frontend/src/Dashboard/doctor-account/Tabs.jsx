import { useContext, useState } from 'react';
import { BiMenu, BiX } from 'react-icons/bi';
import { authContext } from '../../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Tabs = ({ tab, setTab }) => {
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu open/close
  const [activeTab, setActiveTab] = useState(null); // State to track the active tab

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu state
  };

  const toggleTab = (tabName) => {
    setActiveTab(activeTab === tabName ? null : tabName); // Toggle active tab state
    setTab(tabName); // Set the current tab
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
          {activeTab === 'overview' && (
            <div className='w-full p-4 bg-gray-100 rounded-md'>
              {/* Content for Overview */}
              This is the Overview section.
            </div>
          )}

          <button
            onClick={() => toggleTab('appointments')}
            className={`${tab === 'appointments' ? 'bg-indigo-100 text-black' : 'bg-transparent text-black'} w-full btn btn-primary mt-0 mb-2 rounded-md`}>
            Appointments
          </button>
          {activeTab === 'appointments' && (
            <div className='w-full p-4 bg-gray-100 rounded-md'>
              {/* Content for Appointments */}
              This is the Appointments section.
            </div>
          )}

          <button
            onClick={() => toggleTab('settings')}
            className={`${tab === 'settings' ? 'bg-indigo-100 text-black' : 'bg-transparent text-black'} w-full btn btn-primary mt-0 rounded-md`}>
            Profile
          </button>
          {activeTab === 'settings' && (
            <div className='w-full p-4 bg-gray-100 rounded-md'>
              {/* Content for Profile */}
              This is the Profile section.
            </div>
          )}

          <div className='mt-[50px] md:mt-[100px] w-full'>
            <button
              onClick={handleLogout}
              className='w-full bg-[#181A1E] p-3 text-white text-[16px] leading-7 rounded-md'>
              Logout
            </button>
            <button className='w-full bg-red-600 text-white mt-4 p-3 text-[16px] leading-7 rounded-md'>
              Delete Account
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
        {activeTab === 'overview' && (
          <div className='w-full p-4 bg-gray-100 rounded-md'>
            {/* Content for Overview */}
            This is the Overview section.
          </div>
        )}

        <button
          onClick={() => toggleTab('appointments')}
          className={`${tab === 'appointments' ? 'bg-indigo-100 text-black' : 'bg-transparent text-black'} w-full btn btn-primary mt-0 mb-2 rounded-md`}>
          Appointments
        </button>
        {activeTab === 'appointments' && (
          <div className='w-full p-4 bg-gray-100 rounded-md'>
            {/* Content for Appointments */}
            This is the Appointments section.
          </div>
        )}

        <button
          onClick={() => toggleTab('settings')}
          className={`${tab === 'settings' ? 'bg-indigo-100 text-black' : 'bg-transparent text-black'} w-full btn btn-primary mt-0 rounded-md`}>
          Profile
        </button>
        {activeTab === 'settings' && (
          <div className='w-full p-4 bg-gray-100 rounded-md'>
            {/* Content for Profile */}
            This is the Profile section.
          </div>
        )}

        <div className='mt-[50px] md:mt-[100px] w-full'>
          <button
            onClick={handleLogout}
            className='w-full bg-[#181A1E] p-3 text-white text-[16px] leading-7 rounded-md'>
            Logout
          </button>
          <button className='w-full bg-red-600 text-white mt-4 p-3 text-[16px] leading-7 rounded-md'>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
