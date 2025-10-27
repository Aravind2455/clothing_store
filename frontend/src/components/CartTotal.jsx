import React, { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { setCartPrice } from '../redux/productSlice'
import Title from './Title'
import { current } from '@reduxjs/toolkit'


const CartTotal = () => {

    const{cartItems} = useSelector((state)=>state.products)

    const {cartPrice , currency ,deliveryFee} = useSelector((state)=>state.products)

    const dispatch = useDispatch()

    useEffect(()=>{
        let total = 0;
        for(let i=0 ; i<cartItems.length ; i++){
                total = total + ((cartItems[i].productData.price) * (cartItems[i].quantity))
        }
        dispatch(setCartPrice(total))
 
    } , [cartItems])

    

  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'CART'} text2={'TOTALS'} ></Title>
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>SubTotal</p>
                <p>{currency}{cartPrice}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Shipping Fee</p>
                <p>{currency}{deliveryFee}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currency}{cartPrice > 499 ? cartPrice : cartPrice + deliveryFee}.00</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal