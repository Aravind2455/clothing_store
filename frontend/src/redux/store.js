import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import searchReducer from './searchSlice'
const store = configureStore({
    reducer :{
        products : productReducer,
        search : searchReducer,
    }
})

export default store