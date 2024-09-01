import  { useState } from 'react';
import Tabs from './Tabs.jsx';

import Appointments from './Appointments.jsx';
import AllDoctors from './AllDoctors.jsx';
import AllPatients from './AllPatients.jsx';
import starIcon from '../../assets/image/Star.png';

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
                      <span className='bg-[#CCF0F3] text-blue-700 py1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold'>
                        {/* Overview badge */}
                      </span>
                      
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
