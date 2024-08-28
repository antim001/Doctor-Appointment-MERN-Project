import React, { useState, useEffect } from 'react';
import banner9 from '../../assets/image/banner9.jpg';
import banner3 from '../../assets/image/banner3.jpg';
import banner6 from '../../assets/image/banner6.jpg';
import banner7 from '../../assets/image/banner7.jpg';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === totalSlides ? 1 : prevSlide + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [totalSlides]);

  return (
    <div className="carousel w-full h-96">
      <div
        id="slide1"
        className={`carousel-item relative w-full h-full ${currentSlide === 1 ? 'block' : 'hidden'}`}
      >
        <img src={banner9} className="w-full h-full object-cover object-center" alt="Slide 1" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          
        </div>
      </div>
      <div
        id="slide2"
        className={`carousel-item relative w-full h-full ${currentSlide === 2 ? 'block' : 'hidden'}`}
      >
        <img src={banner3} className="w-full h-full object-cover object-center" alt="Slide 2" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          
        </div>
      </div>
      <div
        id="slide3"
        className={`carousel-item relative w-full h-full ${currentSlide === 3 ? 'block' : 'hidden'}`}
      >
        <img src={banner6} className="w-full h-full object-cover object-center" alt="Slide 3" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
         
        </div>
      </div>
      <div
        id="slide4"
        className={`carousel-item relative w-full h-full ${currentSlide === 4 ? 'block' : 'hidden'}`}
      >
        <img src={banner7} className="w-full h-full object-cover object-center" alt="Slide 4" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          
        </div>
      </div>
    </div>
  );
};

export default Banner;
