import jwt from 'jsonwebtoken'

const adminAuth = async(req , res , next )=>{

try {
    const token = req.headers.token;
    if(!token){
        return res.json({
            success : false ,
            message : "Not authorized"
        })
    }
    const token_decode =  jwt.verify(token , process.env.JWT_SECRET)
    if(!token_decode){
        return res.json({
            success : false ,
            message : "Not authorized"
        })
    }
    if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
        if(!token_decode){
        return res.json({
            success : false ,
            message : "Not authorized"
        })
    }
    }
     
    next();
} 
catch (error) {
    res.json({
        success : false ,
        message : error.message
    })
}
}
export default adminAuth;