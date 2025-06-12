import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/helper';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  if (!validateEmail(email)) {
    toast.error('Please enter a valid email address');
    return;
  }

  if (!password) {
    toast.error('Please enter a password');
    return;
  }

  setLoading(true);

  try {
    const res = await axiosInstance.post('/user/login', {
      email,
      password,
    });

  console.log(res);
  
  if (res.data?.token) {
    localStorage.setItem('token', res.data.token);
  }
    toast.success('Logged in successfully!');
    setTimeout(() => {
      navigate('/dashboard'); 
    }, 1500);
  } catch (err) {
  // 1. Developer Logs
  console.error('Login Error:', {
    message: err.message,
    status: err.response?.status,
    data: err.response?.data,
  });

  // 2. User-Friendly Error Display
  if (Array.isArray(err.response?.data?.errors)) {
    err.response.data.errors.forEach((msg) => toast.error(msg));
  } else {
    const fallbackMessage =
      err.response?.data?.message ||
      err.response?.data?.err_msg || 
      'Something went wrong. Please try again.';

    toast.error(fallbackMessage);
  }
} finally {
    setLoading(false);
  }
};


  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className="text-sm text-center mt-4">
              Don't have an account?{' '}
              <Link to="/signUp" className="font-medium text-primary underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
