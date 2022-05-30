import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const checkAuth = async(req,res,next) => {

    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
        
            token = req.headers.authorization.split(' ')[1]
            console.log(token)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
            req.user = await User.findById(decoded.id).select("-password -confirm -token -createdAt -updateAt -__v")
            
            return next()
    
        } catch (error) {
            console.log(error)   
            return res.status(400).json({msg: 'Hubo un Error'})
        }  
    
    }

    

    if(!token ){
        const error = new Error('token no valido')
        return res.status(400).json({msg: error.message})
    }

}