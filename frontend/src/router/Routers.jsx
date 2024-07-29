import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Service from '../pages/Service.jsx'
import Login from '../pages/Login.jsx'
import SignUp from '../pages/SignUp.jsx';
import Doctor from '../pages/Doctor/Doctor.jsx';
import DoctorDetails from '../pages/Doctor/DoctorDetails.jsx'; 




function Routers() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/service' element={<Service />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/doctor' element={<Doctor />} />
      <Route path='/doctordetails' element={<DoctorDetails/>} />
    </Routes>
  );
}

export default Routers;
