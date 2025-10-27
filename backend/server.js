import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoDB.js'
import connectCloudinary from './config/cloudinary.js'

/* App Config */

const app = express()
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();

/* Middlewares */

app.use(express.json())
app.use(cors())

/* API EndPoints */    

app.get('/' , (req , res)=>{
    res.send('API Working')
})
 //Start the express server

 app.listen(port , ()=> console.log('Server Running on ' + port)
  )