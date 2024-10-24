import {  useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import uploadImageToCloudinary from '../../utils/uploadCloudinary.js';
import { toast } from 'react-toastify';
import { BASE_URL, token } from '../../config.js';
import HashLoader from 'react-spinners/HashLoader';

const Profile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photo: null,
    gender: '',
    bloodType: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      password:user.password,
      photo: user.photo,
      gender: user.gender,
      bloodType: user.bloodType || '', // Assuming `user.bloodType` might be available
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);

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
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate('/users/profile/me');
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <form onSubmit={submitHandler} className="card-body">
        <h2 className="text-center">Update Your Profile</h2>
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
            aria-readonly
            readOnly
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
            
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Blood Type</span>
          </label>
          <select
            name="bloodType"
            className="font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
            value={formData.bloodType}
            onChange={handleInputChange}
           
          >
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
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
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="mb-5 flex items-center gap-5">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-blue-300 flex items-center justify-center">
              <img src={formData.photo} alt="" className="w-full rounded-full" />
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
              {selectedFile ? selectedFile.name :"upload photo"}
            </label>
          </div>
        </div>
        <div>
          
               
        
        </div>
        <div className="form-control mt-6">
          <button disabled={loading} type="submit" className="btn btn-primary">
            {loading ? <HashLoader size={35} color="#ffffff" /> : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
