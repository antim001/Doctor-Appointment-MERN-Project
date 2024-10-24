import React from 'react';
import Banner from '../components/Banner/Banner.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Service from '../components/Service.jsx';
import Feature from '../components/Feature.jsx';
import Doctors from '../components/Doctors.jsx';
import Faq from '../components/Faq.jsx';
import Testimonial from '../components/Testimonial.jsx';

const Home = ({ userRole }) => {
  return (
    <div>
      <Banner />
      
   
      
      {/* Only hide Service and Doctors components if the role is exactly 'doctor' */}
      {userRole === 'doctor' ? null : (
        <>
        <Hero />
          <Service />
          <Doctors />
        </>
      )}
    <About />
      <Feature />
      <Faq />
      <Testimonial />
    </div>
  );
};

export default Home;
