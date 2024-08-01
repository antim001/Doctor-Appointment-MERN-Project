import React from 'react'
import {doctors} from './../assets/data/doctors.js'
import DoctorCard from '../components/DoctorCard.jsx'
const Doctors = () => {
  return (
    <div className='xl:w-[1200px] mx-auto p-8 md:gap-5'>
      <h2 className=' text-center '>Our  Great Doctors</h2>
    <p className='text-center'>World-class care for everyone.Our health system offers unmatched,expert health care</p>
   <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
{
    doctors.map((doctor)=>(
        <DoctorCard doctor={doctor} key={doctor.id}/>
    ))
}
   </div>
    </div>
  )
}

export default Doctors
