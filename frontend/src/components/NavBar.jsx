import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setShowSearch } from '../redux/searchSlice'
import { useSelector } from 'react-redux'
import {  setToken , clearCart } from '../redux/productSlice'


const NavBar = () => {
  const cartItems = useSelector((state) => state.products.cartItems)
  const [visible, setVisible] = useState(false)
  const navPages = ['home', 'collection', 'about', 'contact'];
  const dispatch = useDispatch();
  const { search, showSearch } = useSelector((state) => state.search)
  const location = useLocation();
  const [searchButtonVisiblity, setSearchButtonVisiblity] = useState(false);
  const navigate = useNavigate();
  const [cartQuantity, setCartQuantity] = useState(0)

  const {token} = useSelector((state) => state.products)


  const logOutHandller = () => {
    navigate('/login')
    localStorage.removeItem('token')
    dispatch(setToken(''));
    dispatch(clearCart())
  }

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setSearchButtonVisiblity(true)
    }
    else {
      setSearchButtonVisiblity(false)
    }

  }, [location])

  function searchHandller() {

    if (!searchButtonVisiblity) {
      navigate('/collection')
      dispatch(setShowSearch(true))
    }
    else {
      dispatch(setShowSearch(!showSearch))
    }
  }

  useEffect(() => {
    let quantity = 0;
    for (let i = 0; i < cartItems.length; i++) {
      let item = cartItems[i];
      quantity = quantity + item.quantity
    }
    setCartQuantity(quantity)
  }, [cartItems])


  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to={'/'}><img src={assets.logo} className='w-36' alt="" /></Link>
      
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        {
          navPages.map((names, index) => {
            return (
              <NavLink key={index} to={`/${names}`} className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-gray-700' : 'text-gray-400'}`}>
                {({ isActive }) => (
                  <>
                    <p>{names.toUpperCase()}</p>
                    <hr className={`w-2/4 border-none h-[1.5px] ${isActive ? 'bg-gray-700' : 'bg-transparent'}`} />
                  </>
                )}
              </NavLink>
            )
          })
        }
      </ul>
      <div className='flex items-center gap-6'>
        {/*searchButtonVisiblity.includes('/collection')?*/<img onClick={searchHandller} src={assets.search_icon} alt="search-Icon" className='w-5 cursor-pointer' />/*  :null */}
        <div className='group relative'>
          <img onClick={()=> token ? '' : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt="profile-Icon" />
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            {/* Drop Down !!!  */}
            {
              token ? (<div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'>My profile</p>
              <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
              <p className='cursor-pointer hover:text-black' onClick={logOutHandller} >Logout</p>
            </div>) : ''
            }
          </div>
        </div>
        <Link to={'/cart'} className='relative' >
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
          <p className={`${cartQuantity > 0 ? 'absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] ' : 'hidden'}`}>{cartQuantity}</p>
        </Link>
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
      </div>
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className=' cursor-pointer flex items-center gap-4 p-43'>
            <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
            <p>Back</p>
          </div>
          {
            navPages.map((value, index) => {
              return (
                <NavLink className={'py-2 pl-6 border'} onClick={() => setVisible(false)} to={value} key={index}>{value.toUpperCase()}</NavLink>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default NavBar