import { createSlice } from "@reduxjs/toolkit";
import { products } from "../assets/frontend_assets/assets";
import LatestCollection from "../components/LatestCollection";
import { act } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";



const initialState = {  
    products : products,
    currency : '$',
    deliveryFee : 10,
    latestCollection : [],
    cartItems : [],
    cartPrice : 0
}

const ProductSlice = createSlice({
    name : 'products',
    initialState,
    reducers : {
        setLatestCollection : (state , action)=>{
            const[start , end] = action.payload
           state.latestCollection =  state.products.slice(start , end)
        },
        setCartItems : (state , action) =>{
            /* if(state.cartItems.includes(action.payload.productData._id)){
                const sameProduct = state.cartItems.map((item) => item._id === action.payload.productData._id  )
                console.log(sameProduct);  
            }
            else{
                 state.cartItems.push(action.payload)
            } */
            const productToBeAdded = action.payload;
            const existing = state.cartItems.find((item)=>item.productData._id === productToBeAdded.productData._id && item.size === productToBeAdded.size)
            if(existing){
                existing.quantity +=1
                
            }
            else{
                state.cartItems.push(productToBeAdded)
                
            }
            

           /*  const size  = action.payload.size;
            const id = action.payload.productData._id;
            if(cartItems[id] && ) */
            
            
        },

        deleteCartItems :  (state  , action)=>{

            const id = action.payload.id;
            const size = action.payload.size;
            state.cartItems = state.cartItems.filter((item)=>(item.productData._id !== id || item.size !== size))
        },

        updateCartItemsQuantity : (state , action)=>{
            const {size , id , type , quantity} = action.payload

            let matchingElement = state.cartItems.find((item)=>item.productData._id === id && item.size === size)

            if(type === 'increment'){
                
                matchingElement.quantity +=1
                
                
                
            }
            else if(type === 'decrement'){
                
                matchingElement.quantity-=1
                 
            }

            if(matchingElement.quantity<=0){
                state.cartItems = state.cartItems.filter((item)=>!(item.productData._id === id && item.size === size))
            }

            if(matchingElement.quantity >=15){
                /* toast.error('Maximum of 15 Items are allowed') */
                toast.done('loading')
            }

        },
        setCartPrice : (state , action)=>{
            state.cartPrice = action.payload
            console.log(state.cartPrice);
            
        }
    }
})

export const{setLatestCollection , setCartItems , deleteCartItems , updateCartItemsQuantity , setCartPrice } = ProductSlice.actions
export default ProductSlice.reducer