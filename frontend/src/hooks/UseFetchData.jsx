import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';

const UseFetchData = (url, dependencies = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();

        if (!res.ok) {
          if (res.status === 401) {
            // Token is expired, redirect to login
            throw new Error('Token expired, please login again');
          } else {
            throw new Error(result.message || 'Failed to fetch data');
          }
        }

        setData(result.data);
      } catch (err) {
        setError(err.message);
        if (err.message === 'Token expired, please login again') {
          // Redirect to login page
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    } else {
      navigate('/login');
    }
  }, [url, token, navigate, ...dependencies]);

  return { data, loading, error };
};

export default UseFetchData;
