import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import uploadImageToCloudinary from '../utils/uploadCloudinary.js';

import signup from './../assets/image/signup.gif'; // The signup gif
import { toast } from 'react-toastify';
import { BASE_URL } from '../config.js';
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8 flex flex-col lg:flex-row">
        {/* Left Section - Image */}
        <div className="hidden lg:flex items-center justify-center w-1/2">
          <img src={signup} alt="Sign up gif" className="w-[300px] h-[300px]" />
        </div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Create an Account</h2>
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="input input-bordered w-full"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="input input-bordered w-full"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-between gap-4">
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">Sign Up as a:</span>
                </label>
                <select
                  name="role"
                  className="select select-bordered w-full"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">Gender:</span>
                </label>
                <select
                  name="gender"
                  className="select select-bordered w-full"
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
                <figure className="w-[60px] h-[60px] rounded-full border-2 border-blue-300 flex items-center justify-center">
                  <img src={previewURL} alt="Profile Preview" className="w-full rounded-full" />
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
                  className="btn btn-primary absolute top-0 left-0 w-full h-full flex items-center justify-center"
                >
                  Upload Photo
                </label>
              </div>
            </div>

            <h2 className="text-sm text-center">
              Already have an account?{' '}
              <Link to="/login">
                <span className="text-indigo-600 font-semibold">Login</span>
              </Link>
            </h2>

            <div className="form-control mt-6">
              <button
                disabled={loading}
                type="submit"
                className="btn btn-primary w-full py-3 text-lg font-bold"
              >
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
