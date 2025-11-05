import { response } from "express"
import userModel from "../models/userModel.js"

const addToCart = async (req, res) => {
    try {
        const { userId , productData , size } = req.body 

        const user = await userModel.findById(userId)

        let cartData =  user.cartData || [];

        let matchingElement = cartData.find((item) => item.productData._id == productData._id && item.size == size )

        if(matchingElement){    
            matchingElement.quantity +=1
        }
        else{

            cartData.push({  productData , size , quantity : 1 })
        }

        user.cartData = cartData;
        await user.save();
        return res.json({
            success : true,
            message : "Product Added to cart successfully",
            cartData    ,
            user
        })

    } catch (error) {
        console.log(error.message);
        
        return res.json({
            success : false,
            message : error.message
        })
    }

}

const updateUserCart = async (req, res) => {

    try {
        const{ userId ,id , type , size} = req.body
        const user = await userModel.findById(userId)

        let cartData = await user.cartData;

        const matchingProduct = cartData.find((item) => item.productData._id == id && item.size == size)

        if(!matchingProduct){
            return res.json({
                success : false,
                message : "Product Not found"
            })
        }

        if(type == 'increment'){

                if(matchingProduct.quantity >= 15){
                    return res.json({
                        success : false,
                        message : 'Maximum Quantity reached'
                    })
                }
                
                matchingProduct.quantity +=1
            }
            else if(type == 'decrement'){
                matchingProduct.quantity -=1;
                if(matchingProduct.quantity <= 0){
                    cartData = cartData.filter((item) => !(item.productData._id == id && item.size == size) )    
                }
                
            }

        user.cartData = cartData
        await user.save();

        return res.json({
            success : true,
            message : "Cart Updated",
            cartData
        })


    } catch (error) {
        console.log(error.message);
       return  res.json({
            success : false,
            message : error.message
        })
    }

}

const getUserCart = async (req, res) => {

    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        let cartData = await user.cartData;
        return res.json({
            success : true,
            cartData
        })
    } catch (error) {
        return res.json({
            success : false,
            message : error.message
        })
    }
}

const deleteProductFronCart = async(req , res ) => {
    try {
        const { id , size , userId } = req.body;
        const user = await userModel.findById(userId);
        const cartData = user.cartData;
        const deletedArray = cartData.filter((item) => !(item.productData._id == id && item.size == size) );

        user.cartData = deletedArray;
        await user.save();

        return res.json({
            success : true,
            message : 'Product deleted from the cart successfully !',
            cartData
        })
        
        
    } catch (error) {
       return res.json({
            success : false,
            message : error.message
        })
    }
}

const clearCart = async (req , res) => {
    try {
        const {userId} = req.body;

        const user = await userModel.findById(userId);

        user.cartData = [] ;

        await user.save();

       return res.json({
            success : true,
            message : "Cleared Cart successfully !"
        })


    } catch (error) {
        return res.json({
            success : false ,
            message : error.message
        })
    }
}

export { addToCart, updateUserCart, getUserCart, deleteProductFronCart , clearCart }