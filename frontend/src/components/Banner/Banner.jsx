import React, { useState, useEffect } from 'react';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
    "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
    "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [slides.length]);

  return (
    <div className="carousel w-full">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`carousel-item relative w-full ${index === currentSlide ? 'block' : 'hidden'}`}
        >
          <img src={slide} className="w-full" alt={`Slide ${index + 1}`} />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a
              href={`#slide${(index - 1 + slides.length) % slides.length}`}
              className="btn btn-circle"
              onClick={(e) => {
                e.preventDefault();
                setCurrentSlide((index - 1 + slides.length) % slides.length);
              }}
            >
              {/* ❮
            </a>
            <a
              href={`#slide${(index + 1) % slides.length}`}
              className="btn btn-circle"
              onClick={(e) => {
                e.preventDefault();
                setCurrentSlide((index + 1) % slides.length);
              }}
            >
              ❯ */}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
