import  { useState } from 'react';
import Tabs from './Tabs.jsx';

import Appointments from './Appointments.jsx';
import AllDoctors from './AllDoctors.jsx';
import AllPatients from './AllPatients.jsx';
import starIcon from '../../assets/image/Star.png';
import logo from '../../assets/image/logo.png'

const Admin = () => {
  const [tab, setTab] = useState('overview');

  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
        <div className='grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]'>
          <Tabs tab={tab} setTab={setTab} />
          <div className='lg:col-span-2'>
            <div className='mt-8'>
              {tab === 'overview' && (
                <div>
                  <div className='flex items-center gap-4 mb-24'>
                    <figure className='max-w-[200px] max-h-[200px]'>
                      <img src='' alt="" />
                    </figure>
                    <div>
                    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
  <img className="w-16 h-16 mb-4 rounded-full" src={logo} alt="Logo" />
  <h1 className="text-2xl font-bold text-blue-600 mb-2">E-Sheba Platform</h1>
  <h2 className="text-sm text-gray-500 mb-4">(Developed By Antim)</h2>

  <div className="text-left">
    <h2 className="text-lg text-gray-700 font-semibold mb-2">Admin Features:</h2>
    <ul className="list-disc list-inside text-gray-600">
      <li>Admin can see doctors and approve them</li>
      <li>Admin can generate appointment reports and invoices</li>
      <li>Admin can see all the registered patients</li>
    </ul>
  </div>
</div>

                      
                      <div className='flex items-center gap-[6px]'>
                        <span className='flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold'>
                          
                          {/* Rating */}
                        </span>
                      </div>
                      
                    </div>
                  </div>
                </div>
              )}
              {tab === 'appointments' && <Appointments />}
              {tab === 'allDoctors' && <AllDoctors />}
              {tab === 'allPatients' && <AllPatients />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
