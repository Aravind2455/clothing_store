import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LatestCollection from "../components/LatestCollection";
import { backendUrl } from "../config";
import axios from "axios";


const initialState = {
    currency: '₹',
    deliveryFee: 10,
    cartItems: [],
    cartPrice: 0,
    token: localStorage.getItem('token') || ''
}

const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearCart: (state , action)=>{
            state.cartItems = []
        },
        initializeCart : (state , action)=>{
            state.cartItems = action.payload
        },
        setCartPrice: (state, action) => {
            state.cartPrice = action.payload

        },

        setToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const { initializeCart ,clearCart , setCartPrice, setToken } = ProductSlice.actions
export default ProductSlice.reducer