import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../redux/user/userSlice';


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('backend/auth/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-inter font-bold my-7'>
        Login
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <input
          type="text"
          placeholder="username"
          className='border-2 border-blue-1000 p-3 rounded-lg bg-slate-1000'
          id="username" onChange={handleChange} />

        <input
          type="password"
          placeholder="password"
          className='border-2 border-blue-1000 p-3 rounded-lg bg-slate-1000'
          id="password" onChange={handleChange} />

        <button disabled={loading} className='font-bold bg-blue-1001 text- text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Login'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p className='text-gray-500'>Don't have an account?</p>
        <Link to={"/signup"} >
          <span className='text-blue-1001 font-bold'>
            Sign Up
          </span>
        </Link>
      </div>
      {error && <p className='text-red-500 text-center mt-5'>{error}</p>}
    </div>
  )
}