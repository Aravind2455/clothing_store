import React from 'react'
import {assets} from '../assets/assets'




const NavBar = ({setToken}) => {
  return (
    <div className='flex items-center px-[4%] justify-between ' >
        <img src={assets.logo}  className='w-[max(10%,80px)]' alt="" />
        <button onClick={()=>setToken('')}  className=' cursor-pointer bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full sm:text-sm ' >Log Out</button>
    </div>
  )
}

export default NavBar