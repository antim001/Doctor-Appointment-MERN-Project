import React from 'react';
import { Link } from 'react-router-dom';
import about from './../assets/image/about.png';
import aboutcard from './../assets/image/aboutcard.png';

const About = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row lg:gap-20">
        <div className="relative">
          <img
            src={about}
            className="w-full sm:max-w-xs md:max-w-sm lg:max-w-md rounded-lg shadow-2xl"
          />
          <div>
            <img
              src={aboutcard}
              alt=""
              className='absolute left-20 top-20 sm:left-24 sm:top-44 md:left-28 md:top-28 lg:left-36 lg:top-52'
            />
          </div>
        </div>
        <div className='lg:w-1/2'>
          <h1 className="text-5xl font-bold">Proud to be one of the nation's best</h1>
          <p className="py-6">
            Our best is something we strive for each day, caring for our patients—not looking back at what we accomplished but towards
            what we can do tomorrow. Providing the best.
          </p>
          <button className="btn btn-primary">Learn More</button>
        </div>
      </div>
    </div>
  );
}

export default About;
