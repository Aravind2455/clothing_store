import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { backendUrl, currency } from '../App'
import { useEffect } from 'react'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) {
      return null
    }

    try {
      const response = await axios.post(backendUrl + '/api/orders/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
        console.log(response.data.orders);

      }
      else {
        toast.error(response.data.message)
      }


    } catch (error) {
      toast.error(error.message)

    }
  }

  const statusHandller = async(event , orderId) =>{
    try {
      const response = await axios.post(backendUrl + '/api/orders/status' , {orderId , status : event.target.value} , {headers : {token}} )

      if(response.data.success){
        await fetchAllOrders();
      }else{
        console.log(error);
      toast.error(response.data.message)
      }
    } catch (error) {
      
      console.log(error.message);
      
    } 
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

return (
<div className="p-4">
  <h3 className="text-2xl font-semibold mb-4 text-gray-800">All Orders</h3>

  {orders.map((order, mainIndex) => (
    <div
      key={mainIndex}
      className="bg-white border border-gray-200 rounded-lg p-5 mb-4 shadow-sm"
    >
      {/* Top Section */}
      <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start gap-4">
        <img src={assets.parcel_icon} alt="" className="w-10" />

        <div>
          {order.items.map((item, index) => (
            <p key={index} className="text-gray-800 text-sm">
              {item.productData.name} × {item.quantity}
              <span className="text-gray-500 text-xs ml-1">
                (Size: {item.size})
              </span>
            </p>
          ))}
        </div>

        <p className="font-medium text-gray-800">
          {order.address.firstName} {order.address.lastName}
        </p>

        <div className="text-sm text-gray-600 leading-tight">
          <p>{order.address.street}</p>
          <p>
            {order.address.city}, {order.address.state},{" "}
            {order.address.country} {order.address.zipcode}
          </p>
        </div>

        <p className="text-gray-700 text-sm">{order.address.phone}</p>
      </div>

      <hr className="my-3 border-gray-200" />

      {/* Bottom Section */}
      <div className="flex flex-wrap justify-between items-center text-sm text-gray-700">
        <div className="flex flex-wrap gap-5">
          <p>
            <span className="font-semibold">Items:</span> {order.items.length}
          </p>

          <p className="flex items-center gap-1">
            <span className="font-semibold">Payment:</span>
            {order.payment ? (
              <span className="text-green-600 font-medium">✔ Done</span>
            ) : (
              <span className="text-red-500 font-medium">✖ Pending</span>
            )}
          </p>

          <p>
            <span className="font-semibold">Method:</span>{" "}
            {order.paymentMethod}
          </p>

          <p>
            <span className="font-semibold">Date:</span>{" "}
            {new Date(order.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <p className="font-semibold text-gray-900">
            ₹{order.amount.toFixed(2)}
          </p>
          <select onChange={(event) => statusHandller(event , order._id)} value={order.status} className="border border-gray-300 rounded-md px-3 py-1 text-sm">
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>
    </div>
  ))}
</div>

  )
}

export default Orders