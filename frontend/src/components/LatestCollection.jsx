import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Title from './Title'
import { setLatestCollection , setCartPrice } from '../redux/productSlice'
import ProductItem from './ProductItem'

const LatestCollection = () => {

    const {products , latestCollection} = useSelector((state)=>state.products);
    const dispatch = useDispatch();
    

    useEffect(()=>{
        dispatch(setLatestCollection([0,10]))
    },[])
    
    
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={"COLLECTIONS"}></Title>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Upgrade your wardrobe effortlessly by exploring the latest trends from our collection</p>
            
        </div>
        {/* Rendering products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    latestCollection.map((product , index)=>{
                        return(
                        <ProductItem key={index} id={product._id} image={product.image} name={product.name} price={product.price} ></ProductItem>
                        )
                    })
                }
            </div>
    </div>
  )
}

export default LatestCollection