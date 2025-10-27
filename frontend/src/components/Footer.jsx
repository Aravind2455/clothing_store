import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='mt-20'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-4 text-sm '>
          <div> 
            <img src={assets.logo} alt="" className='mb-5 w-32 ' />
            <p className='w-full md:w-2/3 text-gray-600'> We provide high-quality and trendy fashion collections designed with comfort and creativity in mind. 
             Our goal is to deliver stylish clothing at affordable prices and ensure a smooth shopping experience for everyone.</p>
          </div>
          <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <p className='text-xl font-medium mb-5'>Get in touch !</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
              <li>+91 7904555395</li>
              <li>support@forever.com</li>
            </ul>
          </div>
        </div>
        <div>
          <hr />
          <Link to={'#hero'}><p className='py-5 text-sm text-center'>Copyright 2025@forever.com - All rights reserved</p></Link>
          
        </div>
    </div>
  )
}

export default Footer 