import {v2 as cloudinary} from 'cloudinary'
import { data } from 'react-router-dom';
import productModel from '../models/productModel.js'

//Function for add product

const addProduct = async(req , res)=>{
    try {
        const {name , description , price , category , subCategory , sizes , bestSeller} = req.body;
        const image1 =req.files.image1 && req.files.image1[0]
        const image2 =req.files.image2 && req.files.image2[0]
        const image3 =req.files.image3 && req.files.image3[0]
        const image4 =req.files.image4 && req.files.image4[0]

       
        const images = [image1 , image2 , image3 , image4].filter((item)=>item!==undefined)

        const imagesURL = await Promise.all(
            images.map(async(items)=>{
                let result = await cloudinary.uploader.upload(items.path , {resource_type : 'image'});
                return result.secure_url
            })
        ) 

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller : bestSeller === 'true' ? true : false,
            sizes : JSON.parse(sizes),
            image : imagesURL,
            date : Date.now()
        }

        const product = new productModel(productData)

        await product.save()

        res.json({
            success : true,
            message : "Product Added"
        })
    } 
    catch (error) {
        res.json({
            success : false,
            message : error.message
        })
    }
}

//Funcation for list product 

const listProduct = async(req , res)=>{

    try {
        const products = await productModel.find({});
        res.json({
            success : true,
            products
        })
    } catch (error) {
        res.json({
            success : false ,
            message : error.message
        })
    }

    
}

//Function for removing product

const removeProduct = async(req , res)=>{
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({
            success : true,
            message : "Product removed"
        })

    } catch (error) {
        res.json({
            success : false,
            message : error.message
        })
    }

}

//Funcation for singleProductInfo

const singleProduct = async (req , res)=>{

    try {
        const {productId} = req.body
        const product = await productModel.findById();
        res.json({
            success : true,
            product,
        })
    } catch (error) {
        res.json({
            success : false,
            message : error.message 
        })
    }

}

export {listProduct , addProduct , removeProduct , singleProduct}