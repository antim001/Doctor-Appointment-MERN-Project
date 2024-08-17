
import {useState} from 'react';
import Loader from '../../components/Loader/Loading.jsx'
import Error from '../../components/Error/Error.jsx'
import {BASE_URL} from '../../config.js'
import useGetProfile from '../../hooks/UseFetchData.jsx'
import Tabs from './Tabs.jsx'
const Dashboard = () => {
  const {data,loading,error} =useGetProfile(`${BASE_URL}/doctors/profile/me`)
 const [tab,setTab] =useState('overview')
 return <section>
    <div className='max-w-[1170px] px-5 mx-auto'>
      {loading && !error && <Loader/>}
      {error && !loading && <Error/>}
      {
        !loading && !error && data && <div className='grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]'>
             <Tabs tab={tab} setTab={setTab}/>
        <div className='lg:col-span-2'>
          {data.isApproved === 'pending' && <div className='flex p-4 mb-4 text-yellow-800 bg-yellow-500 rounded-lg'>
            
            <svg
  aria-hidden='true'
  className='flex-shrink-0 w-5 h-5'
  fill='currentColor'
  viewBox='0 0 20 20'
  xmlns='http://www.w3.org/2000/svg'
>
  <path
    fillRule='evenodd'
    d="M18 10a8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3z1 1 0 00-1-1H9z"
    clipRule='evenodd'
  />
</svg>
<span className='sr-only'>Info</span>
<div className="ml-3 text-sm font-medium">
  To get approval please complete your profile.We&pos;ll review manually and approve within 3 days
</div>


          </div> }
          <div className='mt-8'>
                  {tab==='overview' && <div>Overview</div>}
                  {tab==='appointments' && <div>Appointments</div>}
                  {tab==='settings' && <div>Profile</div>}
            </div>
        </div>
        </div>
      }
    </div>
  </section>

}

export default Dashboard;

