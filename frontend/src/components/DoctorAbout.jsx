import React from 'react'
import {formateDate} from './../utils/FormateDate.js';

const DoctorAbout = () => {
  return (
    <div>
        <div>
      <h3 className='text-[20px] leading-[30px] font-semibold flex items-center gap'>About of 
        <span className='text-blue-600 font-bold text-[24px] leading-9 ml-2'> Antim Sarker</span>
      </h3>
      <p className="text___para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius assumenda amet sed, provident modi eaque ducimus. Nulla blanditiis quidem, aut expedita sit, quia eaque nesciunt sequ
        i, quis id odit voluptas!</p>
    </div>
    <div className='mt-12'>
 <h3 className='text-[20px] leading-[30px] font-semibold'>Education</h3>
    
    <ul className='pt-4 md:p-5'>
<li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
    <div>
       <span className='text-blue-600 text-[15px] leading-6 font-semibold'>{formateDate('12-04-2010')}</span> 
   <p className='text-[16px] leading-6 font-medium '>PHD in Surgeon</p>
    </div>
    <p className='text-[14px] leading-5 font-medium '>New Apolo Hospital,New Jersey</p>
</li>
<li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
    <div>
       <span className='text-blue-600 text-[15px] leading-6 font-semibold'>23 June,2007</span> 
   <p className='text-[16px] leading-6 font-medium '>PHD in Surgeon</p>
    </div>
    <p className='text-[14px] leading-5 font-medium '>New Apolo Hospital,New Jersey</p>
</li>
        </ul>
        </div>
        <div className='mt-12'>
            <h3 className='text-[14px] leading-5 font-medium '>Experience</h3>
        
        <ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5 '>
        <li className='p-4 rounded bg-[#fff9ea]'>
                <span className='text-yellow-600 text-[15px] leading-6 font-semibold'>{formateDate('07-04-2010')}-{formateDate('07-04-2014')}</span>
                <p className='text-[16px] leading-6 font-medium '>Sr. Surgeon</p>
            
                <p className='text-[14px] leading-5 font-medium '>New Apolo Hospital,New Jersey</p></li>
                <li className='p-4 rounded bg-[#fff9ea]'>
                <span className='text-yellow-600 text-[15px] leading-6 font-semibold'>{formateDate('07-04-2010')}-{formateDate('07-04-2014')}</span>
                <p className='text-[16px] leading-6 font-medium '>Sr. Surgeon</p>
            
                <p className='text-[14px] leading-5 font-medium '>New Apolo Hospital,New Jersey</p></li>
                
        
        </ul>
        
        </div>
    </div>
  )
}

export default DoctorAbout
