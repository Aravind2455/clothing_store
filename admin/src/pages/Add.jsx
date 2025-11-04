import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    price: "",
    sizes: [],
    bestseller: false,
  })

  const addProductHandller = async (e) => {
    e.preventDefault();
    try {
      const toastId = toast.loading("Uploading product..."); // show loading toast
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("category", productData.category);  
      formData.append("subCategory", productData.subCategory);
      formData.append("price", productData.price);
      formData.append("sizes", JSON.stringify(productData.sizes));
      formData.append("bestSeller", productData.bestseller);
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(backendUrl + '/api/product/add', formData , { headers: { token } } )


      if (response.data.success) {
        
        //toast.success(response.data.message);
        toast.update(toastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

        setProductData({
          name: "",
          description: "",
          category: "",
          subCategory: "",
          price: "",
          sizes: [],
          bestseller: false,
        })

        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);


      }
      else{
        toast.update(toastId, {
        render: response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
        
        console.log(response.data.message);
        
      }

    }
    catch (error) {
      toast.update(toastId, {
      render: error.message,
      type: "error",
      isLoading: false,
      autoClose: 2000,
    })
      console.log(error.message);
      
    }

  }


  return (
    <div>
      <form onSubmit={addProductHandller} className='flex flex-col w-full items-start'  >
        <div>
          <p className='mb-2' >Upload Image</p>

          <div className='flex gap-2' >

            <label className='cursor-pointer' htmlFor='image1' >
              <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
              <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
            </label>

            <label className='cursor-pointer' htmlFor='image2' >
              <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
              <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
            </label>

            <label className='cursor-pointer' htmlFor='image3' >
              <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
              <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
            </label>

            <label className='cursor-pointer' htmlFor='image4' >
              <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
              <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
            </label>

          </div>
        </div>

        <div className='w-full' >
          <p className='mb-2' >Product Name :</p>
          <input value={productData.name} onChange={(e) => setProductData({ ...productData, name: e.target.value })} className={`w-full max-w-[500px] px-3 py-2`} type="text" placeholder='Type Here' required />
        </div>

        <div className='w-full' >
          <p className='mb-2' >Product Description :</p>
          <textarea value={productData.description} onChange={(e) => setProductData({ ...productData, description: e.target.value })} className='w-full max-w-[500px] px-3 py-2 ' type="text" placeholder='Type Here' required />
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8' >

          <div>
            <p className='mb-2' >Product Category</p>
            <select value={productData.category} onChange={(e) => setProductData({ ...productData, category: e.target.value })} className='w-full px-3 py-2' >
              <option value="">Select Category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>Product Sub-Category</p>
            <select value={productData.subCategory} onChange={(e) => setProductData({ ...productData, subCategory: e.target.value })} className='w-full px-3 py-2' >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>Product Price</p>
            <input type="Number" value={productData.price} onChange={(e) => setProductData({ ...productData, price: e.target.value })} className='w-full px-3 py-2 sm:w-[145px]' placeholder='Example : 25' />
          </div>

        </div>

        <div>
          <p className='mb-2' >Product Sizes</p>
          <div className='flex gap-4'>
            <div>
              <p onClick={() => setProductData(prev => prev.sizes.includes('S') ? { ...prev, sizes: prev.sizes.filter((item) => item !== 'S') } : { ...prev, sizes: [...prev.sizes, "S"] })} className={` transition-none px-3 py-1 cursor-pointer ${productData.sizes.includes('S') ? `bg-pink-200 ` : `bg-slate-200`} `} >S</p>
            </div>

            <div>
              <p onClick={() => setProductData(prev => prev.sizes.includes('M') ? { ...prev, sizes: prev.sizes.filter((item) => item !== 'M') } : { ...prev, sizes: [...prev.sizes, "M"] })} className={` transition-none px-3 py-1 cursor-pointer ${productData.sizes.includes('M') ? `bg-pink-200 ` : `bg-slate-200`} `}>M</p>
            </div>

            <div>
              <p onClick={() => setProductData(prev => prev.sizes.includes('L') ? { ...prev, sizes: prev.sizes.filter((item) => item !== 'L') } : { ...prev, sizes: [...prev.sizes, "L"] })} className={` transition-none px-3 py-1 cursor-pointer ${productData.sizes.includes('L') ? `bg-pink-200 ` : `bg-slate-200`} `}>L</p>
            </div>

            <div>
              <p onClick={() => setProductData(prev => prev.sizes.includes('XL') ? { ...prev, sizes: prev.sizes.filter((item) => item !== 'XL') } : { ...prev, sizes: [...prev.sizes, "XL"] })} className={` transition-none px-3 py-1 cursor-pointer ${productData.sizes.includes('XL') ? `bg-pink-200 ` : `bg-slate-200`} `}>XL</p>
            </div>

            <div>
              <p onClick={() => setProductData(prev => prev.sizes.includes('XXL') ? { ...prev, sizes: prev.sizes.filter((item) => item !== 'XXL') } : { ...prev, sizes: [...prev.sizes, "XXL"] })} className={` transition-none px-3 py-1 cursor-pointer ${productData.sizes.includes('XXL') ? `bg-pink-200 ` : `bg-slate-200`} `}>XXL</p>
            </div>

          </div>
        </div>

        <div className='flex gap-2 mt-5 mb-2' >
          <input onChange={() => setProductData({ ...productData, bestseller: !productData.bestseller })} type="checkbox" checked={productData.bestseller} id='bestseller' />
          <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
        </div>

        <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>

      </form>
    </div>
  )
}

export default Add