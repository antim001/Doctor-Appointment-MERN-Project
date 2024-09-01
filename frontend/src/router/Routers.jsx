import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Service from '../pages/Service.jsx'
import Login from '../pages/Login.jsx'
import SignUp from '../pages/SignUp.jsx';
import Doctor from '../pages/Doctor/Doctor.jsx';
import DoctorDetails from '../pages/Doctor/DoctorDetails.jsx';
import Contact from '../pages/Contact.jsx';
import MyAccount from '../Dashboard/user-account/MyAccount.jsx'
import Dashboard from '../Dashboard/doctor-account/Dashboard.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import CheckoutSuccess from '../pages/Doctor/CheckoutSuccess.jsx';
import Admin from '../Dashboard/admin-account/Admin.jsx'
import PrintInvoice from '../pages/PrintInvoice.jsx';

function Routers() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/service' element={<Service />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/doctor' element={<Doctor />} />
      <Route path='/doctor/:id' element={<DoctorDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/users/profile/me" element={<ProtectedRoute allowedRoles={['patient']}><MyAccount /></ProtectedRoute>} />
      <Route path="/doctors/profile/me" element={<ProtectedRoute allowedRoles={['doctor']}><Dashboard /></ProtectedRoute>} />
      <Route path='/checkout-success' element={<CheckoutSuccess />} />
      <Route path="/admin/profile/me" element={<ProtectedRoute allowedRoles={['admin']}><Admin /></ProtectedRoute>} />

      <Route path="/print-invoice/:id" element={<PrintInvoice />} />
    </Routes>
  );
}

export default Routers;