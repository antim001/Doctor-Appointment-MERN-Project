import {Link} from 'react-router-dom';
import avatar from './../assets/image/doctor-img01.png'

const SignUp = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content  ">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold"></h1>
      {/* <img src={signup} alt="" /> */}
    </div>
    <div className="card bg-base-100 w-full  shrink-0 shadow-2xl">
      <form className="card-body">
        <h2 className='text-center'>Create an Accout</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder=" enter your name" className="input input-bordered" required />
        </div>
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
          
        </div>
        <div className='flex justify-between mt-2'>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Sign Up as a:</span>
          </label>
          <select name='role' className='font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Gender:</span>
          </label>
          <select name='gender' className='font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>

          </select>
        </div>
        </div>
        <div className='mb-5 flex items-center gap-5'>
          <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-blue-300 flex items-center justify-center'>
            <img src={avatar} alt="" className='w-full rounded-full' />
          </figure>
          <div className='relative w-[130px] h-[50px]'>
            <input type="file" name='photo' id='customfile'  accept='.jpg,.png'
            className='absolute top-0 left-0 w-full opacity-0 cursor-pointer'
            />
            <label htmlFor="customfile" className="btn btn-primary absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#00066ff46] text-blue font-semibold rounded-lg truncate cursor-pointer">Upload Photo</label>
          </div>
        </div>
        
        
        <h2>Already Have an Account? Please<Link to='/login'> <span className='text-green-700 font-semibold'>Login</span></Link></h2>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
        
      </form>
    </div>
  </div>
</div>
  )
}

export default SignUp

