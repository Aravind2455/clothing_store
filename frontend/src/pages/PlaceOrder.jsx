import React, { useState, useEffect } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { backendUrl } from '../config'
import { useDispatch, useSelector } from 'react-redux'
import { initializeCart } from '../redux/productSlice'
import { toast } from 'react-toastify'
import { current } from '@reduxjs/toolkit'

const PlaceOrder = () => {

  const { token, cartItems, deliveryFee, cartPrice } = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);
  const [method, setMethod] = useState('COD');;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/product/list');
        if (response.data.success) {
          setProducts(response.data.products)
        } else {
          console.log(response.data.message);

        }
      } catch (error) {
        console.log(error.message);

      }
    }

    fetchProducts();

  }, [])


  const onChangeHandller = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  const initPay = (order) =>{
    const options = {
      key : import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount : order.amount,
      currency : order.currency,
      name : "Order Payment",
      order_id : order.id,
      receipt : order.receipt,
      handler : async (response) =>{
        try {
          const {data} = await axios.post(backendUrl + '/api/orders/verifyRazorpay' , response , {headers : {token}} )
          if(data.success){
            navigate('/orders');
            dispatch(initializeCart([]))
          }
          else{
            navigate('/cart')
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
          
        } 
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [...cartItems];
      let orderData = {
        items: orderItems,
        amount: cartPrice + deliveryFee,
        address: formData
      }

      switch (method) {

        case 'COD':
          const response = await axios.post(backendUrl + '/api/orders/place', orderData, { headers: { token } });
          if (response.data.success) {
            await axios.post(backendUrl + '/api/cart/clear', {}, { headers: { token } })
            dispatch(initializeCart([]))
            navigate('/orders')
          }
          else {
            toast.error(response.data.message)
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/orders/stripe' , orderData , {headers : {token}})
          if(responseStripe.data.success){
            const {session_url} = responseStripe.data;
            window.location.replace(session_url)
          }
          else{
            toast.error(responseStripe.data.message)
          }
        break;

          case 'razorpay' :
            const razorpayResponse = await axios.post(backendUrl + '/api/orders/razorpay' , orderData , {headers : {token}} );
            if(razorpayResponse.data.success){
              initPay(razorpayResponse.data.order);
            }
            else{
              console.log(razorpayResponse);
              
            }
          break;


      }
    }
    catch (error) {
      console.log(error);
    }
  }




  return (
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 min-h-[80vh] border-t ' >
      {/* ===============LEFT SIDE ==================== */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} ></Title>
        </div>
        <div className='flex gap-3'>
          <input type="text" placeholder='First Name' name='firstName' onChange={onChangeHandller} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='Last Name' name='lastName' onChange={onChangeHandller} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input type="email" name='email' onChange={onChangeHandller} placeholder='Email Adress' className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />
        <input type="text" placeholder='Street' name='street' onChange={onChangeHandller} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />
        <div className='flex gap-3'>
          <input type="text" name='city' onChange={onChangeHandller} placeholder='City' className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='State' name='state' onChange={onChangeHandller} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />
        </div>
        <div className='flex gap-3'>
          <input type="Number" placeholder='Zip Code' name='zipcode' onChange={onChangeHandller} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='Country' name='country' onChange={onChangeHandller} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input type="Number" placeholder='Phone' name='phone' onChange={onChangeHandller} className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />
      </div>
      {/* =======================Right Side======================= */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal></CartTotal>
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} ></Title>
          {/* ================Payment method selection===================== */}
          <div className='flex gap-2 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' && 'bg-[#635BFF]'} `}></p>
              <img src={assets.stripe_logo} className='h-5 mx-4' alt="" />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' && 'bg-[#3395FF]'}`}></p>
              <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />
            </div>
            <div onClick={() => setMethod('COD')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full  ${method === 'COD' && 'bg-[#7F8591]'} `}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button className='bg-black text-white px-16 py-3 text-sm' > Place Order </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder