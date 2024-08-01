import React from 'react'
import Banner from '../components/Banner/Banner.jsx'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Service from '../components/Service.jsx'
import Feature from '../components/Feature.jsx'
import Doctors from '../components/Doctors.jsx'
import Faq from '../components/Faq.jsx'
const Home = () => {

  return (
    <div>
     <Banner></Banner>
    <Hero></Hero>
    <About></About>
    <Service/>
    <Feature/>
    <Doctors/>
    <Faq></Faq>
    </div>

  )
}

export default Home
