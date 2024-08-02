import React from 'react';
import { Link } from 'react-router-dom';
import Testimonial from '../../components/Testimonial.jsx'
import {doctors} from '../../assets/data/doctors.js'
import DoctorCard from '../../components/DoctorCard.jsx'
const Doctor = () => {
  return (
    <div>
      <h1 className='text-center text-2xl'>Find a doctor</h1>
<div className='max-w-[570px] mt-[30px] mx-auto  bg-[#0066ff2c] rounded-md  flex items-center justify-between'>
<input type="search" className='py-4 pl-4 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-black' placeholder="search doctor" />
<button className='btn mt-0 rounded-[0px] rounded-r-md bg-blue-500'>Search</button>
</div>
<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4'>
{
    doctors.map((doctor)=>(
        <DoctorCard doctor={doctor} key={doctor.id}/>
    ))
}
   </div>
   <Testimonial/>
    </div>
  )
}

export default Doctor
