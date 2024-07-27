import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from "axios"
function Login() {
  const navigate=useNavigate()
  const handleLogin=async(e)=>{
    e.preventDefault();
    const form=e.target;
    const email=form.email.value;
    const password=form.password.value;
    const user={
      "email":email,
      "password":password
    }
    try{
      const response= await axios.post("http://localhost:5000/api/user/login",user)
 if(response.data.success){
     toast.success(response.data.message)
   localStorage.setItem("token",response.data.data)
    navigate('/')
  }else{
   toast.error(response.data.message)
 }
    }catch(error){
      toast.error("Invalid credentials")
    }

  }
  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl">
        <form onSubmit={handleLogin} className="card-body">
          <h1 className="text-center font-semibold text-2xl mb-4">Login Now</h1>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="email" name='email' className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="password" name='password'className="input input-bordered" required />
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
