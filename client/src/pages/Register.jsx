import React from 'react'
import {Link} from 'react-router-dom';
function Register() {
  const submitForm=(e)=>{
    e.preventDefault();
    const form=e.target;
    const name=form.name.value;
    const email=form.email.value;
    const password=form.password.value;
    const user={
      "name":name,
      "email":email,
      "password":password
    }
    console.log(user)
  }
  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl">
        <form onSubmit={submitForm} className="card-body">
          <h1 className="text-center font-semibold text-2xl mb-4">Register Now</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" name='name' placeholder="name" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <h1 className='font-medium'>Already Have an Account?Please <Link to='/login'><span className='text-green-400'>Login</span></Link></h1>
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
