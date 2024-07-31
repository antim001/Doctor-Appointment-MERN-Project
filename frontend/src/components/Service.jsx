import React from 'react'
import {services} from './../assets/data/services.js'
import ServiceCard from '../components/ServiceCard.jsx'
const Service = () => {
  return (
    <div className='xl:w-[1200px] mx-auto p-8'>
      <h2 className=' text-center '>Our medical services</h2>
    <p className='text-center'>World-class care for everyone.Our health system offers unmatched,expert health care</p>
   <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-20 mt-[30px] lg:mt-[55px]'>
    {
        services.map((service, index) =>
            <ServiceCard key={index} service={service} />
    )}
   </div>
    </div>
  )
}

export default Service
