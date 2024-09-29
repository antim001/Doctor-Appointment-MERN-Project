import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { BASE_URL } from '../config.js';
import { toast } from 'react-toastify';
import { authContext } from '../../context/AuthContext.jsx';
import HashLoader from 'react-spinners/HashLoader';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Corrected useNavigate
  const { dispatch } = useContext(authContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: result.data,
          token: result.token,
          role: result.role,
        },
      });
      console.log(result, 'login data')
      setLoading(false);
      toast.success(result.message);

      if (result.role == "admin")
        navigate("/");
      else
        navigate('/');
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  const sendResetPassMail = async () => {
    try {
      setLoading(true);

      if (!formData.email)
        toast.warning("Enter your mail in the email field and then click on 'Forget password'");
      else {
        const res = await fetch(`${BASE_URL}/auth/reset_pass_mail`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email }),
        });

        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message);
        }

        toast.success(result.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold"></h1>
          <p className="lg:hidden md:hidden">
            Welcome to E-<span className="text-blue-600">Sheba</span>
          </p>
          <p className="lg:hidden md:hidden">Login Now!</p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={submitHandler} className="card-body">
            <h2 className="text-center font-semibold text-2xl">Login Now!</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
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
                name="password"
                placeholder="password"
                className="input input-bordered"
                value={formData.password} // Corrected to bind the password value
                onChange={handleInputChange}
                required
              />
              <label className="label">
                <a onClick={sendResetPassMail} href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <h2>
              New here? Please{' '}
              <Link to="/signup">
                <span className="text-green-700 font-semibold">Register</span>
              </Link>
            </h2>
            <div className="form-control mt-6">
              <button className="btn btn-primary">

                {loading ? <HashLoader size={25} color='#fff' /> : 'Login'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
