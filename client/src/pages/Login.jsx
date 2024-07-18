import React from 'react'
import {Link} from 'react-router-dom'
function Login() {
  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl">
        <form className="card-body">
          <h1 className="text-center font-semibold text-2xl mb-4">Login Now</h1>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="email" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="password" className="input input-bordered" required />
           <h1 className='font-medium'>New Here?Please<Link to='/register'> <span className='text-green-400'>Register</span></Link></h1>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
