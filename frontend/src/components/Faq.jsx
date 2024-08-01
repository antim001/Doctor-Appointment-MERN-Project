import React from 'react'
import { faqs } from './../assets/data/faqs.js'
import FaqCard from '../components/FaqCard.jsx'
import faq from './../assets/image/faq-img.png'

const Faq = () => {
  return (
    <div className='flex justify-between gap-[50px] lg:gap-0 mt-4'>
      <div className='w-1/2 hidden md:block  ml-8'>
        <img src={faq} alt="" />
      </div>
      <div className='w-full md:w-1/2'>
        <h2 className='font-bold text-2xl mb-2'>Most questions asked by our beloved patients</h2>
        {
          faqs.map((faq, index) => (
            <FaqCard key={index} faq={faq} />
          ))
        }
      </div>
    </div>
  )
}

export default Faq
