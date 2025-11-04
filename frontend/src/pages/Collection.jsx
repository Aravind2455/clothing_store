import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { backendUrl } from '../config'
import  axios  from 'axios'
const Collection = () => {

  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async()=>{
      try {
        const response = await axios.get(backendUrl + '/api/product/list');
        if(response.data.success){
           setProducts(response.data.products)
        }else{
          console.log(response.data.message);
          
        }
      } catch (error) {
        console.log(error.message);
        
      }
    }

    fetchProducts();

  },[])

  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sort, setSort] = useState("relevant")
  const { search, showSearch } = useSelector((state) => state.search)



  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }



  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter((item) => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  useEffect(() => {
    setFilterProducts(products)
  }, [products])

  useEffect(() => {
    applyFilter();

  }, [category, subCategory, sort, search, showSearch , products])


  const applyFilter = () => {
    let productCopy = [...products]

    if (showSearch && search) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
    }

    if (sort === 'low-high') {
      productCopy = productCopy.sort((a, b) => a.price - b.price)
    }
    else if (sort === 'high-low') {
      productCopy = productCopy.sort((a, b) => b.price - a.price)
    }
    else {
      productCopy = productCopy
    }

    setFilterProducts(productCopy)
  }





  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filters in the left side */}
      <div className='min-w-60 '>
        <p className='my-2 text-xl flex items-center font-semibold cursor-pointer gap-2 ' onClick={() => setShowFilter(!showFilter)} >FILTERS <img src={assets.dropdown_icon} className={` h-3 sm:hidden ${showFilter ? 'rotate-90' : 'rotate-0'}`} alt="" /> </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input onChange={toggleCategory} value={'Men'} type="checkbox" className='w-3' />
              MEN
            </p>
            <p className='flex gap-2'>
              <input onChange={toggleCategory} value={'Women'} type="checkbox" className='w-3' />
              WOMEN
            </p>
            <p className='flex gap-2'>
              <input onChange={toggleCategory} value={'Kids'} type="checkbox" className='w-3' />
              KIDS
            </p>
          </div>
        </div>
        {/* SubCategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input value={'Topwear'} onChange={toggleSubCategory} type="checkbox" className='w-3' />
              TOPWEAR
            </p>
            <p className='flex gap-2'>
              <input value={'Bottomwear'} onChange={toggleSubCategory} type="checkbox" className='w-3' />
              BOTTOMWEAR
            </p>
            <p className='flex gap-2'>
              <input value={'Winterwear'} onChange={toggleSubCategory} type="checkbox" className='w-3' />
              WINTER WEAR
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}></Title>
          <select onChange={(e) => setSort(e.target.value)} className='border border-gray-300 text-sm px-2'>
            <option value="relevant">Sort-By : Relevant</option>
            <option value="low-high">Sort-By : Low to High</option>
            <option value="high-low">Sort-By : High to Low</option>
          </select>
        </div>
        {/* Map Products */}

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => {
              return (
                <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}></ProductItem>
              )
            })
          }
        </div>

      </div>
    </div>
  )
}

export default Collection