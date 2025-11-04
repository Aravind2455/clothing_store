import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { backendUrl } from '../config';
import { initializeCart } from '../redux/productSlice';
import { toast } from 'react-toastify';

const Verify = () => {

    const { token } = useSelector((state) => state.products);
    const [searchParams , setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const dispatch = useDispatch()

    const verifyPayment = async()=>{
        try {
            if(!token){
                return null;
            }

            const response = await axios.post(backendUrl + '/api/orders/verifyStripe' , {success , orderId } , {headers : {token}});

            if(response.data.success){
                dispatch(initializeCart([]));
                navigate('/orders')
            }else{
                navigate('/cart')
            }

        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
            
        }
    }

    useEffect(()=>{
        verifyPayment()
    } , [])

  return (
    <div>

    </div>
  )
}

export default Verify