import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { BASE_URL } from '../config.js';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const ForgetPass = () => {
    const { token } = useParams();

    const [formData, setFormData] = useState({
        pass: '',
        confirmPass: '',
        token
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (formData.pass != formData.confirmPass) {
            toast.error("New password and confirm password don't match");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/auth/reset-pass/`, {
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

            toast.success(result.message);
            navigate('/login');
        } catch (err) {
            toast.error(err.message);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold"></h1>
                    <p className="lg:hidden md:hidden">
                        Welcome to E-<span className="text-blue-600">Sheba</span>
                    </p>
                    <p className="lg:hidden md:hidden">Reset password</p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={submitHandler} className="card-body">
                        <h2 className="text-center">Reset password</h2>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">New password</span>
                            </label>
                            <input
                                type="password"
                                name="pass"
                                placeholder="Fresh password"
                                className="input input-bordered"
                                value={formData.pass}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm password</span>
                            </label>
                            <input
                                type="password"
                                name="confirmPass"
                                placeholder="Type your password again"
                                className="input input-bordered"
                                value={formData.confirmPass}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <input type="hidden" name="token" value={formData.token} />

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">

                                {loading ? <HashLoader size={25} color='#fff' /> : 'Reset'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgetPass;