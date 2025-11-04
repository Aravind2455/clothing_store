import React, { useState ,useEffect  } from 'react'
import { useSelector } from 'react-redux'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { backendUrl } from '../config'
import axios from 'axios'
const Orders = () => {

  const { currency , token } = useSelector((state)=>state.products)
  const[orderData , setOrderData] = useState([]);

  
      const fetchOrderData = async ()=>{
        try {
          if(!token){
            return null
          }
          const respone = await axios.post(backendUrl + '/api/orders/userOrders' , {} , {headers : {token}} );
          if(respone.data.success){
            let allOrdersItem = [] ;
            respone.data.orders.map((orders , index) => {
              orders.items.map((item)=>{
                item['status'] = orders.status
                item['payment'] = orders.payment
                item['paymentMethod'] = orders.paymentMethod
                item['date'] = orders.date
                allOrdersItem.push(item)

              })
            } )
            /* console.log(allOrdersItem ); */
            setOrderData(allOrdersItem.reverse())
          }else{
            console.log(respone.data.message);
            
          }
        } catch (error) {
            console.log(error.message);
            
        } 
      }


      useEffect(()=>{
         fetchOrderData();
      }, [token])


  return (
    <div className='border-t pt-16' >
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} ></Title>
      </div>
      <div className=''>
        {
          orderData.map((item , index)=>{
            return(
              <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'  >
                <div className='flex items-start gap-6 text-sm'>
                  <img src={item.productData.image[0]} className='w-16 sm:w-20' />
                  <div className='flex flex-col gap-1'>
                    <p className='sm:text-base font-medium' >{item.productData.name}</p>
                    <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                      <p className='text-lg'>{currency}{item.productData.price}.00</p>
                      <p>Quantity : {item.quantity}</p>
                      <p>Size : {item.size}</p>
                    </div>
                    <p>Date : <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                    <p>Payment : <span className='text-gray-400'>{item.paymentMethod}</span></p>
                  </div>
                </div>
                <div className='w-1/2 flex justify-between'>
                  <div className='flex items-center gap-2'>
                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                    <p className='text-sm md:text-base'>{item.status}</p>
                  </div>
                  <button onClick={fetchOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm hover:bg-black hover:text-white' > Track Order</button>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Orders