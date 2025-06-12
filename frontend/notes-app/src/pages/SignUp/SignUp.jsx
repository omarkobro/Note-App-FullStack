import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { validateEmail } from '../../utils/helper';
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/helper';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Basic validations
    if (!name) return toast.error('Please enter your name');
    if (!validateEmail(email)) return toast.error('Please enter a valid email');
    if (!password) return toast.error('Please enter a password');

    setLoading(true);

    try {
      const res = await axiosInstance.post('/user/signup', {
        fullName: name,
        email,
        password,
      });

      toast.success('Account created successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 1000); 
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      );
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
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">Sign Up</h4>
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <button
              className="btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            <p className="text-sm text-center mt-4">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-primary underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
