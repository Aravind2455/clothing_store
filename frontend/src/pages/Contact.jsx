import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
const Contact = () => {
  return (
    <div className='' >
      <div className='text-center text-2xl pt-10 border-t' >
        <Title text1={'CONTACT'} text2={'US'} ></Title>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
      <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />
      <div className='flex flex-col justify-center items-start gap-6' >
        <p className='font-semibold text-xl text-gray-600' >Our Store</p>
        <p className='text-gray-500' >252/26 , Aruppukottai <br/>  626101 , TamilNadu , India </p>
        <p className='text-gray-500' > Phone : +91 79045 55395 <br></br> Email : aravind@forever.com </p>
        <p className='font-semibold text-xl text-gray-600' >Careers at Forever</p>
        <p className='text-gray-500'> Learn more about our teams and job openings </p>
        <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white hover:font-bold hover:px-9 hover:py-5  ' >Explore Jobs</button>
        <p></p>
      </div>
      </div>  
      <NewsLetterBox></NewsLetterBox>
    </div>
  )
}

export default Contact