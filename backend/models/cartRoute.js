import { addToCart, clearCart, deleteProductFronCart, getUserCart, updateUserCart } from '../controllers/cartController.js'
import userAuth from '../middleware/userAutih.js'
import express from 'express'


const cartRouter = express.Router()

cartRouter.post('/get' , userAuth , getUserCart );
cartRouter.post('/update' , userAuth , updateUserCart );
cartRouter.post('/add' , userAuth , addToCart );
cartRouter.post('/delete' , userAuth , deleteProductFronCart );
cartRouter.post('/clear' , userAuth ,  clearCart )

export default cartRouter