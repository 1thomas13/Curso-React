const User = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
require('dotenv').config()

exports.authUser = async (req,res,next) => {
    const {email, password} = req.body

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const user = await User.findOne({email})
    
    if(!user){
        return res.status(401).json({msg:'El usuario no Existe'})   
    }

    if(bcrypt.compareSync(password, user.password)){
        const token = jwt.sign({name: user.name, id: user._id}, process.env.SECRET_JWT, {expiresIn: '8h'})
        return res.json({token})
    }
    else {
        return res.status(401).json({msg:'Contrasena Incorrecta'})   
    }

    
}

exports.userAuthenticated = async (req,res,next) => {
    res.json({user:req.user})
}
