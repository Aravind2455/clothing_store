import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsLetterBox'
import {assets} from '../assets/frontend_assets/assets'
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} ></Title>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-10'>
        <img src={assets.about_img} className='w-full md:max-w-[480px] '  alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 '>
          <p>We’re RAASH CLOTHING — born from creativity, built for self-expression.
              Our mission? To turn art into everyday fashion. We design exclusive graphic tees inspired by culture, street style, and the bold energy of youth.
              Every print, every detail, every stitch is made to make you feel original, confident, and unstoppable. We don’t follow trends — we create them.
              Join the RAASH movement and wear your vibe with pride.</p>
          <p>Every RAASH tee is made with premium fabric, vibrant prints, and a perfect   fit that keeps you comfortable all day long.
            We’re committed to maintaining top-notch quality, affordability, and eco-conscious practices in everything we do — because we care about both our customers and the planet.</p>
            <b className='text-gray-800' >Our Mission : </b>
            <p>Our mission is to make art wearable and style personal. We create graphic t-shirts that reflect your vibe, energy, and story. At RAASH, we don’t just follow trends — we design pieces that inspire confidence, celebrate individuality, and keep you looking effortlessly cool wherever you go.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US ?'} ></Title>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className=' group hover:bg-black hover:text-white border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-xl' >Quality Assurance </b>
          <p className='text-gray-600 group-hover:text-gray-400 ' > We care about what you wear — that’s why every RAASH t-shirt is made with soft, long-lasting fabric and vibrant prints that never fade easily. From stitching to packaging, our team ensures top-notch quality so you can wear your style with confidence, every single day.</p>
        </div>
        <div  className= 'group hover:bg-black hover:text-white border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-xl' >Convenience</b>
          <p className='text-gray-600 group-hover:text-gray-400  ' >Your convenience is our priority. We’ve built a simple, user-friendly shopping experience with reliable order tracking, safe transactions, and responsive customer support — so you can enjoy your RAASH shopping journey without any interruptions.</p>
        </div>
        <div className=' group hover:bg-black hover:text-white border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-xl' >Exceptional Customer Service</b>
          <p className='text-gray-600 group-hover:text-gray-400  ' >We’re not just a brand — we’re your fashion fam!
Our team at RAASH is always here to help you with quick responses, easy returns, and genuine support. Whether it’s tracking your order or solving a size issue, we make sure your experience is as cool and effortless as our tees.</p>
        </div>
      </div>
      <NewsletterBox></NewsletterBox>
    </div>
  )
}

export default About