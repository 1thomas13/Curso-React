const User = require('../models/Users')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')

exports.newUser = async (req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body

    const userExist = await User.findOne({email})

    if(userExist){
        return res.status(400).json({msg:'El Usuario ya esta registrado'})
    }

    const user = new User(req.body)

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    try {
        await user.save()
        res.status(200).json({msg:'Usuario creado correctamente'})
    } catch (error) {
        console.log(error)
    }
}