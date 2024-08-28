import {useEffect,useState,useContext} from 'react'
import { Link } from "react-router-dom";
import {authContext} from '../../../context/AuthContext.jsx';
import logo from '../../assets/image/logo.png'

function Header() {
  const navLinks = <>
    <li><Link to='/'>Home</Link></li>
    <li><Link to='/doctor'>Doctor</Link></li>
    <li><Link to='/service'>Service</Link></li>
    <li><Link to='/contact'>Contact</Link></li>
  </>
  const {user,token,role}=useContext(authContext)

  return (
    <div className="navbar bg-base-100 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {navLinks}
          </ul>
        </div>
        <img className='w-28 h-28' src={logo} alt="" />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end or-2">
        {
          token && user? <div >
<Link to={`${role==='doctor'? '/doctors/profile/me':'/users/profile/me'}`}>
<figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
<img src={user?.photo} alt="User profile" />
</figure>

</Link>
          </div>:
          <Link to='/login'><button className='btn btn-primary '>
            Login</button></Link>
        }
        
      </div>
    </div>
  )
}

export default Header
