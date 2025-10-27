import React, { useState } from 'react'

const Login = () => {
  
  const [status , setStatus] = useState('Sign Up');

  const onSubmitHandller = async(event)=>{
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmitHandller} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 '>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'  >{status}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800 ' />
      </div>
      {
        status === 'Login'?'':<input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />   
      }
      <input type="email" className='w-full py-2 px-3 border border-gray-800' placeholder='Email' required/>
      <input type="password" className='w-full py-2 px-3 border border-gray-800' placeholder='Password' required />
    
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        {status === 'Login' ? <p className='hover:text-blue-500 font-medium cursor-pointer  ' >Forgot Password ?</p> : <p className='hover:text-blue-500 font-medium cursor-pointer  ' >Help</p>}
        {status === 'Login' ? <p onClick={()=>setStatus('Sign Up')} className='hover:text-blue-500 font-medium cursor-pointer ' >Create account</p> : <p onClick={()=>{setStatus('Login')}} className='hover:text-blue-500 font-medium cursor-pointer  ' >Login Here </p>}
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4 ' >{status === 'Login' ? 'Sign In' :'Sign Up'  }</button>
    </form>
  )
}

export default Login