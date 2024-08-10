import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import uploadImageToCloudinary from '../utils/uploadCloudinary.js';
import avatar from './../assets/image/doctor-img01.png';
import signup from './../assets/image/signup.gif';
import { toast } from 'react-toastify';
import { BASE_URL } from '/config.js';
import HashLoader from 'react-spinners/HashLoader';

const SignUp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photo: selectedFile,
    gender: '',
    role: 'patient'
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!formData.gender) {
      toast.error('Please select a gender.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate('/login');
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold"></h1>
          {/* <img src={signup} alt="" /> */}
        </div>
        <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
          <form onSubmit={submitHandler} className="card-body">
            <h2 className="text-center">Create an Account</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                className="input input-bordered"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="input input-bordered"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="input input-bordered"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-between mt-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Sign Up as a:</span>
                </label>
                <select
                  name="role"
                  className="font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Gender:</span>
                </label>
                <select
                  name="gender"
                  className="font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </div>
            <div className="mb-5 flex items-center gap-5">
              {selectedFile && (
                <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-blue-300 flex items-center justify-center">
                  <img src={previewURL} alt="" className="w-full rounded-full" />
                </figure>
              )}
              <div className="relative w-[130px] h-[50px]">
                <input
                  type="file"
                  name="photo"
                  id="customfile"
                  onChange={handleFileInputChange}
                  accept=".jpg,.png"
                  className="absolute top-0 left-0 w-full opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="customfile"
                  className="btn btn-primary absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#00066ff46] text-blue font-semibold rounded-lg truncate cursor-pointer"
                >
                  Upload Photo
                </label>
              </div>
            </div>
            <h2>
              Already Have an Account? Please
              <Link to="/login">
                {' '}
                <span className="text-green-700 font-semibold">Login</span>
              </Link>
            </h2>
            <div className="form-control mt-6">
              <button disabled={loading} type="submit" className="btn btn-primary">
                {loading ? <HashLoader size={35} color="#ffffff" /> : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
