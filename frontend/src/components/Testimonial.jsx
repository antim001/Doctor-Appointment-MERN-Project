
import React from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import patientavatar from './../assets/image/patient-avatar.png';
import { HiStar } from 'react-icons/hi';

const Testimonial = () => {
  return (
    <div className='xl:w-[1200px] mx-auto p-8 md:gap-5'>
      <h2 className='text-center'>What our patients say</h2>
      <p className='text-center'>World-class care for everyone. Our health system offers unmatched, expert health care.</p>
      <div className='mt-[30px] lg:mt-[55px]'>
        <Swiper
          className='my-swiper'
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 0
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30
            },
          }}
          style={{ paddingBottom: '2rem' }}  // Adjust this value to move the dots up or down
        >
          <SwiperSlide>
            <div className='py-[30px] px-5 rounded-[13px] bg-blue-300'>
              <div className='flex items-center gap-[13px]'>
                <img src={patientavatar} alt="Patient Avatar" />
                <div>
                  <h4 className='text-[18px] leading-[30px] font-semibold'>Antim Sarker</h4>
                  <div className='flex items-center gap-[2px]'>
                    <HiStar className='text-[#FFC107]' />
                    <HiStar className='text-[#FFC107]' />
                    <HiStar className='text-[#FFC107]' />
                    <HiStar className='text-[#FFC107]' />
                    <HiStar className='text-[#FFC107]' />
                  </div>
                </div>
              </div>
              <p className='text-[16px] leading-7 mt-4 font-[400]'>I have taken medical services from them. They treat so well and they are providing the best medical services.</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='py-[30px] px-5 rounded-[13px] bg-blue-300'>
              <div className='flex items-center gap-[13px]'>
                <img src={patientavatar} alt="Patient Avatar" />
                <div>
                  <h4 className='text-[18px] leading-[30px] font-semibold'>Antim Sarker</h4>
                  <div className='flex items-center gap-[2px]'>
                    <HiStar className='text-[#FFC107]' />
                    <HiStar className='text-[#FFC107]' />
                    <HiStar className='text-[#FFC107]' />
                    <HiStar className='text-[#FFC107]' />
                    <HiStar className='text-[#FFC107]' />
                  </div>
                </div>
              </div>
              <p className='text-[16px] leading-7 mt-4 font-[400]'>I have taken medical services from them. They treat so well and they are providing the best medical services.</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='py-[30px] px-5 rounded-[13px] bg-blue-300'>
              <div className='flex items-center gap-[13px]'>
                <img src={patientavatar} alt="Patient Avatar" />
                <div>
                  <h4 className='text-[18px] leading-[30px] font-semibold'>Antim Sarker</h4>
                  <div className='flex items-center gap-[2px]'>
                    <HiStar className='text-[#FFC107]' />
                    <HiStar className='text-[#FFC107]' />
                    <HiStar className='text-[#FFC107]' />
                    <HiStar className='text-[#FFC107]' />
                    <HiStar className='text-[#FFC107]' />
                  </div>
                </div>
              </div>
              <p className='text-[16px] leading-7 mt-4 font-[400]'>I have taken medical services from them. They treat so well and they are providing the best medical services.</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='py-[30px] px-5 rounded-[13px] bg-blue-300'>
              <div className='flex items-center gap-[13px]'>
                <img src={patientavatar} alt="Patient Avatar" />
                <div>
                  <h4 className='text-[18px] leading-[30px] font-semibold'>Antim Sarker</h4>
                  <div className='flex items-center gap-[2px]'>
                    <HiStar className='text-[#FFC107]' />
                    <HiStar className='text-[#FFC107]' />
                    <HiStar className='text-[#FFC107]' />
                    <HiStar className='text-[#FFC107]' />
                    <HiStar className='text-[#FFC107]' />
                  </div>
                </div>
              </div>
              <p className='text-[16px] leading-7 mt-4 font-[400]'>I have taken medical services from them. They treat so well and they are providing the best medical services.</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Testimonial;
