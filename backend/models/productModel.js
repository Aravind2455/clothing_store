import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true 
    },
    price : {
        type : Number,
        required : true
    },
    image :{
         type : Array,
        required : true
    },
    category :{
        typeof : String,
        required : true
    },
    subCategory :{
        typeof : String,
        required : true
    },
    sizes :{
        typeof : Array,
        required : true
    },
    bestseller :{
        typeof : Boolean,
        required : true
    },
    date :{
        typeof : Number,
        required : true
    }
   
})

const productModel = mongoose.model.product ||  mongoose.model("product" , productSchema )      


export default productModel