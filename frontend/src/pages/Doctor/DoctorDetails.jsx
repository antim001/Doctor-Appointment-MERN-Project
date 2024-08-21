import {useState}from 'react';
import SidePanel from '../../components/SidePanel.jsx'
import Feedback from '../../components/Feedback.jsx'
import DoctorAbout from '../../components/DoctorAbout.jsx'
import StarIcon from '../../assets/image/Star.png'
import { BASE_URL } from '../../config.js';
import UseFetchData from '../../hooks/UseFetchData.jsx';
import Loader from '../../components/Loader/Loading.jsx';
import Error from '../../components/Error/Error.jsx';
import {useParams } from 'react-router-dom'
const DoctorDetails = () => {

  const [tab,setTab]=useState('about');
  const {id} =useParams()
  const { data: doctor, loading, error } = UseFetchData(`${BASE_URL}/doctors/${id}`);
   const{
    name,
    qualifications,
    timeSlots,reviews,
    about,avergeRating,
    totalRating,
    photo,specialization ,
    bio,ticketPrice,
   experiences
   } =doctor
  return (
    <div className='max-w-[1200px] px-5 mx-auto'>
  {loading && <Loader />}
  {error && <Error />}
   { !loading && !error && <div className='grid md:grid-cols-3 gap-[50px]'>
<div className='md:col-span-2'>
  <div className='flex items-center gap-5'>
    <figure className='max-w-[200px] max-h-[200px]'>
      <img src={photo}alt="" className='w-full' />
    </figure>
    <div>
      <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>{specialization}</span>
   <h3 className='text-[22px] leading-9 mt-3 font-bold'>{name}</h3>
   <div className='flex items-center gap-[6px]'>
    <span className='flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold '>
     <img src={StarIcon} alt="" /> {avergeRating}
    </span>
    <span className='text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400]'>{totalRating}</span>
   </div>
   <p className='text__para text-[14px] md:text-[15px] leading-5 lg:max-w-[390px]'>{bio}
</p>
    </div>
  </div>

<div className='mt-[50px] border-b border-solid border-[#0066ff34]'>
<button
  onClick={()=>setTab('about')}
   className={`${tab==='about' && 'border-b border-solid border-blue-950'} py-2 px-5 mr-5 text-[16px] leading-7 font-semibold `}>ABout</button>
   

  <button
  onClick={()=>setTab('feedback')}
   className={`${tab==='feedback' && 'border-b border-solid border-blue-950'} py-2 px-5 mr-5 text-[16px] leading-7 font-semibold `}>Feedback</button>
  
  
   </div>
<div className='mt-[50px]'>
  {
    tab==='about' && <DoctorAbout name={name} 
    about={about}
    qualifications={qualifications}
    experiences={experiences}

    
    />
  }
  {
    tab==='feedback' && <Feedback reviews={reviews} totalRating={totalRating}/>
  }
</div>
</div>
<div>
  <SidePanel doctorId={doctor._id} ticketPrice={ticketPrice} timeSlots={timeSlots}/>
</div>
    </div>}
    </div>
  )
}

export default DoctorDetails
