
import userModel from '../models/userModel.js'
import validator from 'validator'
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id)=>{
    return jwt.sign({id} , process.env.JWT_SECRET )
}

//Route for userLogin
const loginUser = async (req , res)=>{
    try{
        const {email , password} = req.body;

        

        if(!validator.isEmail(email)){
          return  res.json({
                success : false,
                message : "please enter a valid email"
            })   
        }

        const user = await userModel.findOne({email});

        if(!user){
          return  res.json({
                success : false,
                message : "User Does not exist"
            })
        }

        const isMatch = await bcrypt.compare(password , user.password)

        if(isMatch){
            const token = createToken(user._id)

           return res.json({
                success : true,
                token
            })
        }else{
           return res.json({
                success : false,
                message : "Invalid Password"
            })
        }

    }
    catch(error){
       return res.json({
            success : false,
            message : error.message
        })
    }
}

//Route for user registration
const registerUser = async(req , res)=>{
    try{
        const {name , email , password} = req.body

        //Checking user if already exist or not 
        //Validating email format and strong password

        if(!validator.isEmail(email)){
            return res.json({
                success : false,
                message : "Please enter a valid  email"
            })
        }

        const exist = await userModel.findOne({email})
        if(exist){
           return res.json({
                success : false,
                message : "User already Exist"
            })
        }
        
        
        if(password.length < 8 ){
          return  res.json({
                success : false,
                message : "Please enter a strong password"
            })
        }

        //Hashing user password  

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)

        const newUser = new userModel({
            name ,
            email,
            password : hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

       return res.json({
            success : true ,
            token
        })

    }catch(error){
        console.log(error);
       return res.json({
            success : false,
            message : error.message
        })
        
    }
}

//route for admin login

const adminLogin = async(req , res)=>{
    try {
        const {email , password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ){
            const token = jwt.sign(email+password , process.env.JWT_SECRET)
          return  res.json({
                success : true,
                token
            })
        }
        else{
           return res.json({
                success : false ,
                message : "Invalid credentials !"
            })
        }
    } catch (error) {
        return res.json({
                success : false ,
                message : error.message
            })
    }
    
}

export {loginUser , registerUser ,adminLogin }