import React, { useEffect, useState , useRef } from 'react'
import { useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {assets} from '../assets/frontend_assets/assets'
import RelatedProducts from '../components/RelatedProducts'
import { setCartItems } from '../redux/productSlice'
import { toast } from 'react-toastify'

const Product = () => {

  const {productId} = useParams();
  const {cartItems} = useSelector((state)=>state.products)
  const {products , currency} = useSelector((state)=>state.products)
  const [productData , setProductData] = useState(false)
  const [image , setImage] = useState('')
  const[size , setSize] = useState('')
  const dispatch = useDispatch();
  const {cartPrice} = useSelector((state)=>state.products)
  
  
  const fetchProductData = async ()=>{
    products.map((item)=>{
      if(item._id === productId){
        setProductData(item)
        setImage(item.image[0])
        return null
      }
    })
  }

  const manageCart = ()=>{

    if(!size){
      toast.error('Select Product Size')
      return
    }
    else{
      dispatch(setCartItems({
      productData : productData ,
      size : size ,
      quantity : 1
    }))
    }

    setSize('')

    
  }

  const productRef = useRef(null)
  
  useEffect(()=>{
    fetchProductData();
  },[productId])

  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}, [productId]);


  return productData ? (
    <div  className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity=100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row '>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex  overflow-x-auto sm:flex-col sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%]'>
            {
              productData.image.map((item , index)=>{
                return <img key={index  } src={item} onClick={()=>setImage(item)} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              })
            }
          </div>
          <div className='w-full sm:w-[80%]'> 
            <img className='w-full h-auto' src={image} alt="" />  
          </div>
        </div>
        {/* Product Information */}
        <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
                <img className='w-3 ' src={assets.star_icon} alt="" />
                <img className='w-3 ' src={assets.star_icon} alt="" />
                <img className='w-3 ' src={assets.star_icon} alt="" />
                <img className='w-3 ' src={assets.star_icon} alt="" />
                <img className='w-3 ' src={assets.star_dull_icon} alt="" />
                <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description }</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item , index)=>{
                  return <button onClick={()=>setSize(item)}  className={`border py-2 px-4 bg-gray-100 ${item===size? 'border-[2px] border-orange-500':''}`} key={index}>{item}</button>
                })}
              </div>
            </div>
            <button onClick={manageCart} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 rounded ' >Add to Cart</button>
            <hr className='mt-8 sm:4/5' />
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original Product</p>
              <p>COD Availible on this product</p>
              <p>Easy return and exchange policy within 7 days</p>
            </div>
        </div>
      </div>
      {/* Description */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6  py-6 text-sm text-gray-500'>
          <p>Step up your streetwear game with this bold and artistic graphic tee from RAASH CLOTHING. Designed for trendsetters who love to stand out, this t-shirt combines comfort and creativity in one perfect piece. Crafted with premium 100% cotton fabric, it offers a soft, breathable feel that keeps you cool all day while giving your outfit an effortless, confident vibe.</p>
          <p>Whether you’re hitting the streets, chilling with friends, or creating content, this tee adds instant character to your look. The vibrant, long-lasting print reflects your individuality and stays sharp even after multiple washes. Pair it with jeans, cargos, or shorts — this one’s made to fit every mood and every style.</p>
        </div>
      </div>
      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} ></RelatedProducts>
    </div>
  ) : (<div className=''>No Products Found !</div>)
}

export default Product