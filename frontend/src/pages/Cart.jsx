import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import { deleteCartItems, updateCartItemsQuantity } from '../redux/productSlice'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import CartTotal from '../components/CartTotal'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const navigate = useNavigate()


  const {products , currency , cartItems} = useSelector((state)=>state.products)
  const dispatch = useDispatch()



  const deleteProduct = (id , size)=>{
    dispatch(deleteCartItems({id , size}))
  }

  const updateCartQuantity = ( size , id , type ,quantity )=>{
    dispatch(updateCartItemsQuantity({size , id , type ,  quantity}))
  }

 /*  useEffect(()=>{
    console.log('Cart updated' , cartItems);
    
  } , [cartItems]) */
  
  
  return cartItems.length>0? (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} ></Title>
      </div>
      <div>
        {
          cartItems.map((item , index)=>{
            
            return(
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 ' >
                <div className='flex items-start gap-6'>
                  <img src={item.productData.image[0]} className='w-16 sm:w-20' alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{item.productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                        <p>{currency}{item.productData.price}</p>
                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50' >{item.size}</p>
                    </div>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <button disabled = {item.quantity <=0}  onClick={()=>updateCartQuantity(item.size , item.productData._id , 'decrement' , item.quantity )}  className='border max-w-10 sm:max-w-20 px-1 sm:px-2  py-1 text-center bg-gray-300'>-</button>
                  <input className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center'  type="text" min={1}   name=""  value={item.quantity} onChange={()=>{}}  id="" />
                  <button   onClick={()=>updateCartQuantity(item.size , item.productData._id , 'increment' , item.quantity )} className='border max-w-10 sm:max-w-20 px-1 sm:px-2  py-1 text-center bg-gray-300' disabled = {item.quantity >=15} >+</button>
                </div>

                <img src={assets.bin_icon} className='w-4 mr-4 sm:w-5 cursor-pointer' onClick={()=>deleteProduct(item.productData._id , item.size)} alt="" />
                
              </div>
            )
          })
        }
      </div>
      <div className='flex justify-end my-20' >
        <div className='w-full sm:w-[450px]'>
          <CartTotal></CartTotal>
          <div className='w-full text-end'>
            <button onClick={()=>navigate('/placeOrder')} className='bg-black text-white text-sm my-8 px-8 py-3'>Proceed to checkout</button>
          </div>
        </div>
      </div>
      
      <BestSeller></BestSeller>
    </div>
    
  ) : (
  <div className='flex flex-col items-center justify-center gap-3 ' >
    <Title  text1={'YOUR'} text2={'CART'} ></Title>
    <div className='  flex flex-col gap-5  items-center justify-center ' >
      <img className='w-100  ' src={assets.emptyCart_100} alt="" />
      <h1 className=' flex text-center items-center justify-center w-full  text-2xl  ' >No clothes yet — start filling  your cart !</h1>
    </div>
  <LatestCollection></LatestCollection>
  </div>)
  
}

export default Cart