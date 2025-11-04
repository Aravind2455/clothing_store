import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { backendUrl } from '../config';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {setToken} from '../redux/productSlice'

const Login = () => {

  const [status, setStatus] = useState('Login');
  const { token } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassWord] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const onSubmitHandller = async (event) => {
    event.preventDefault();
    try {
      if (status === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password
        });
        if(response.data.success){
          dispatch(setToken(response.data.token));
          localStorage.setItem('token'  , response.data.token);
        }
        else{
          toast.error(response.data.message)
        }
      }
      else {
        const response = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        });
        if(response.data.success){
          dispatch(setToken(response.data.token));
          localStorage.setItem('token'  , response.data.token);
        }
        else{
          toast.error(response.data.message)
        }


      }

    }
    catch (error) {
      toast.error(error.message)
    }
  }

    useEffect(()=>{
      if(token){
        navigate('/')
      }
      
    },[token])

  return (
    <form onSubmit={onSubmitHandller} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 '>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'  >{status}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800 ' />
      </div>
      {
        status === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />
      }
      <input type="email" onChange={(e) => setEmail(e.target.value)} className='w-full py-2 px-3 border border-gray-800' placeholder='Email' required />
      <input type="password" onChange={(e) => setPassWord(e.target.value)} className='w-full py-2 px-3 border border-gray-800' placeholder='Password' required />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        {status === 'Login' ? <p className='hover:text-blue-500 font-medium cursor-pointer  ' >Forgot Password ?</p> : <p className='hover:text-blue-500 font-medium cursor-pointer  ' >Help</p>}
        {status === 'Login' ? <p onClick={() => setStatus('Sign Up')} className='hover:text-blue-500 font-medium cursor-pointer ' >Create account</p> : <p onClick={() => { setStatus('Login') }} className='hover:text-blue-500 font-medium cursor-pointer  ' >Login Here </p>}
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4 ' >{status === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login