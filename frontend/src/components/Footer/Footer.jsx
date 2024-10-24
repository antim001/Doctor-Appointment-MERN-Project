import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/image/logo.png'
const Footer = () => {
  return (
    <footer className="footer bg-base-300 text-base-content p-10 mt-5">
  <aside>
    <img src={logo} className='w-28 h-28'alt="" />
    <p>
     E-sheba
      <br />
      Providing health service from 2024
    </p>
  </aside>
  
  <nav>
    <h6 className="footer-title">Company</h6>
   <Link to='/'>About </Link>
   <Link to='/contact'>Contact us </Link>
   <Link to='/contact'>Jobs </Link>
   <Link to='/contact'>Press Kit </Link>
  </nav>
  <nav>
  <Link to='/contact'>Legal </Link>
  <Link to='/contact'>Terms of services </Link>
  <Link to='/contact'>Privacy policy </Link>
  <Link to='/contact'>Cookie Policy </Link>
  </nav>
</footer>
  );
}

export default Footer;

