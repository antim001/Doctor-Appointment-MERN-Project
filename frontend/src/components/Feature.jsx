import React from 'react';
import { Link } from 'react-router-dom';
import featurs from './../assets/image/features.mp4';

const Feature = () => {
  return (
    <div className="hero  min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <video
          autoPlay
          loop
          muted
          className="w-full max-w-lg h-96 rounded-lg shadow-lg"
        >
          <source src={featurs} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="lg:w-1/2 p-6">
          <h1 className="text-5xl font-bold mb-4">Get virtual treatment <br />anytime</h1>
          <p className='mb-2'>1.Schedule the appointement directly</p>
          <p className='mb-2'>2.Search your physician and contact their office</p>
         <p className='mb-4'>3.View our physician who are accepting new patients,use the online scheduling tool to select an appointment time</p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Feature;
