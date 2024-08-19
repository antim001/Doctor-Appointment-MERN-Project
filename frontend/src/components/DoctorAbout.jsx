import React from 'react';
import { formateDate } from './../utils/FormateDate.js';

const DoctorAbout = ({ name, about, qualification = [], experience = [] }) => {
  // Debugging output
  console.log('DoctorAbout props:', { name, about, qualification, experience });

  return (
    <div>
      {/* About Section */}
      <div>
        <h3 className='text-[20px] leading-[30px] font-semibold flex items-center gap'>
          About
          <span className='text-blue-600 font-bold text-[24px] leading-9 ml-2'>{name}</span>
        </h3>
        <p className='text___para'>{about}</p>
      </div>
      
      {/* Education Section */}
      <div className='mt-12'>
        <h3 className='text-[20px] leading-[30px] font-semibold'>Education</h3>
        <ul className='pt-4 md:p-5'>
          {qualification.length === 0 ? (
            <p>No education data available.</p>
          ) : (
            qualification.map((item, index) => (
              <li key={index} className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                <div>
                  <span className='text-blue-600 text-[15px] leading-6 font-semibold'>
                    {formateDate(item.startingDate)} - {formateDate(item.endingDate)}
                  </span>
                  <p className='text-[16px] leading-6 font-medium'>{item.degree}</p>
                </div>
                <p className='text-[14px] leading-5 font-medium'>{item.university}</p>
              </li>
            ))
          )}
        </ul>
      </div>
      
      {/* Experience Section */}
      <div className='mt-12'>
        <h3 className='text-[20px] leading-[30px] font-semibold'>Experience</h3>
        <ul className='pt-4 md:p-5'>
          {experience.length === 0 ? (
            <p>No experience data available.</p>
          ) : (
            experience.map((item, index) => (
              <li key={index} className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                <div>
                  <span className='text-yellow-600 text-[15px] leading-6 font-semibold'>
                    {formateDate(item.startingDate)} - {formateDate(item.endingDate)}
                  </span>
                  <p className='text-[16px] leading-6 font-medium'>{item.position}</p>
                </div>
                <p className='text-[14px] leading-5 font-medium'>{item.hospital}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default DoctorAbout;
