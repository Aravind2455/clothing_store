import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Title from './Title';
import ProductItem from './ProductItem';
import axios from 'axios';
import { backendUrl } from '../config';
import { products } from '../assets/frontend_assets/assets';

const BestSeller = () => {

    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const getBestSeller = async () => {
            try {
                const response = await axios.get(backendUrl + '/api/product/list')
                if (response.data.success) {
                    const allBestSellers = response.data.products.filter((item) => item.bestSeller )
                    setBestSeller(allBestSellers.slice(0,5))
                    
                }else{
                    console.log(response.data.message);
                    
                }
            } catch (error) {
                console.log(error.message);
                
            }   

        }
        getBestSeller()
    }, [])

    /* useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestSeller))
        setBestSeller(bestProduct.slice(0, 5))
    }, []) */

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLER'} ></Title>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Upgrade your wardrobe effortlessly by exploring the Bestsellers from our collection</p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSeller.map((item, index) => {
                        return (
                            <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} ></ProductItem>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default BestSeller