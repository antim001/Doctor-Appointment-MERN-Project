import React from 'react';
import {Link} from 'react-router-dom'
import icon01 from './../assets/image/icon01.png'
import icon02 from './../assets/image/icon02.png'
import icon03 from './../assets/image/icon03.png'
import { BsArrowRight } from "react-icons/bs";
const Hero = () => {
  return (
    <div>
      <div className='lg:w-[470px] mx-auto'>
  <h2 className='font-bold text-center'>Providing the best medical services</h2>
      
      <p className='text-center '>World class care for everyone.Our health system offers unmatched,expert health care</p>
      </div>
      <div className='flex flex-wrap items-center flex-col md:flex-row gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px'>
<div className='py-[30px] px-5'>
<div className='flex items-center justify-center'>
<img src={icon01} alt="" />
</div>
<div className='mt-[30px]'>
    <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>Find a doctor</h2>
<p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>World-class care for everyone.Our health system offers unmatched,expert health care.From the lab to the clinic</p>
<Link to='/doctor' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-blue-400 hover::border-none '>
<BsArrowRight className='group-hover:text-white w-6 h-5'/>
</Link>
</div>
</div>
<div className='py-[30px] px-5'>
<div className='flex items-center justify-center'>
<img src={icon02} alt="" />
</div>
<div className='mt-[30px]'>
    <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>Find a Location</h2>
<p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>World-class care for everyone.Our health system offers unmatched,expert health care.From the lab to the clinic</p>
<Link to='/doctor' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-blue-400 hover::border-none '>
<BsArrowRight className='group-hover:text-white w-6 h-5'/>
</Link>
</div>
</div>
<div className='py-[30px] px-5'>
<div className='flex items-center justify-center'>
<img src={icon03} alt="" />
</div>
<div className='mt-[30px]'>
    <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>Book Appointment</h2>
<p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>World-class care for everyone.Our health system offers unmatched,expert health care.From the lab to the clinic</p>
<Link to='/doctor' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-blue-400 hover::border-none '>
<BsArrowRight className='group-hover:text-white w-6 h-5'/>
</Link>
</div>
</div>
         </div>
      </div>
      
    </div>
  )
}

export default Hero
