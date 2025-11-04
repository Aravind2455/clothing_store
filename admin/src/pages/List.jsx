import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify';

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const toastId = toast.loading("Fetching Products , PLease wait !");
      const response = await axios.get(backendUrl + '/api/product/list')


      if (response.data.success) {
        toast.update(toastId, {
          render: "Fetched Products",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setList(response.data.products)
        console.log(list);

      }
      else {
        toast.update(toastId, {
          render: "Some Error occured",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }

    } catch (error) {
      toast.update(toastId, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  }

  const removeProduct = async (id) => {

    try {
      const toastId = toast.loading("Fetching Products , PLease wait !");
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.update(toastId, {
          render: "Product Deleted Successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        await fetchList();

      }
      else {
        toast.update(toastId, {
          render: "Some Error occured",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  }

  
  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>

        {/* List table title */}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 border border-gray-300 bg-gray-100 text-sm '>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>


        {/* List Products */}
        {
          list.map((item, index) => {
            return (<div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center  gap-2 py-2 px-2 border border-gray-300 text-sm '  >
              <img className='w-12' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p className='text-right md:text-center mr-19 cursor-pointer text-lg' onClick={() => removeProduct(item._id)} >X</p>
              <p></p>
            </div>)
          })
        }
      </div>
    </div>
  )
}

export default List