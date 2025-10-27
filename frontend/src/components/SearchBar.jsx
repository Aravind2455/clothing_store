import React, { useEffect } from 'react'

import { setSearch , setShowSearch } from '../redux/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import { assets } from '../assets/frontend_assets/assets'
import { useLocation  } from 'react-router-dom'
import { useState , useRef } from 'react'

const SearchBar = () => {

    const {search , showSearch} = useSelector((state)=>state.search)
    const dispatch = useDispatch();
    const location = useLocation();
    const [searchComponentVisiblity , setSearchComponentVisiblity] = useState(false);
    const inputRef = useRef(null)
    
      useEffect(()=>{
        if(location.pathname.includes('collection')){
            setSearchComponentVisiblity(true);
        }
        else{
            setSearchComponentVisiblity(false)
        }
        
      },[location])


      useEffect(()=>{
        if(showSearch && inputRef.current){
            inputRef.current.focus();
        }
      } , [showSearch])
    

  return showSearch && searchComponentVisiblity? (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex item-center justify-center border border-gray-400 px-5 py-2 mx-5 my-3 rounded-full w-3/4 sm:w-1/2'>
            <input ref={inputRef} value={search} onChange={(e)=>dispatch(setSearch(e.target.value))} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search' />
            <img src={assets.search_icon} className='w-5 h-5 cursor-pointer' alt="" />
        </div>
        <img src={assets.cross_icon} className='inline w-5 h-5 cursor-pointer' onClick={()=>dispatch(setShowSearch(false))} alt="" />
    </div>
  ) : null
}

export default SearchBar