
import { emailRegister, forgetPasswordEmail } from '../helpers/email.js'
import { generateId } from '../helpers/generateId.js'
import { generateJWT } from '../helpers/generateJWT.js'
import User from '../models/User.js'

export const createUser = async(req,res) =>{

    const {email} = req.body

    const validateEmail = await User.findOne({email:email})

    if(validateEmail) {
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({msg:error.message})
    }

    try {
        const user = new User(req.body)
        user.token = generateId()
        await user.save()
        
        emailRegister({email:user.email, name:user.name, token:user.token})

        res.json({msg:'Usuario Creado Correctamente, Revisa Tu Email Para Confirmar Tu Cuenta'})

    } catch (err) {
        console.log(err)
    }

} 

export const auth = async(req,res) =>{

    const {email,password} = req.body

    const user = await User.findOne({email})
    
    if(!user) {
        const error = new Error('El usuario no Existe')
        return res.status(400).json({msg:error.message})
    }

    if(!user.confirm) {
        const error = new Error('Tu cuenta no ha sido Confirmada')
        return res.status(400).json({msg:error.message})
    }

    if(await user.checkPassword(password)){
        res.json({_id:user._id,
            name: user.name,
            email:user.email,
            token: generateJWT(user._id),
        })
    } else{
        const error = new Error('Contraseña Incorrecta')
        return res.status(400).json({msg:error.message})
    }

    
} 

export const confirm = async(req,res) =>{

    const {token} = req.params

    console.log(token)

    const confirmUser = await User.findOne({token})

    if(!confirmUser) {
        const error = new Error('Token no Válido')
        return res.status(400).json({msg:error.message})
    }
    try {
        confirmUser.confirm = true
        confirmUser.token = ''

        await confirmUser.save()

        res.status(200).json({msg:'Usuario Confirmado Correctamente'})

    } catch (error) {
        console.log(error)
    }
} 

export const forgetPassword = async(req,res) =>{

    const {email} = req.body

    const user = await User.findOne({email})

    if(!user) {
        const error = new Error('El usuario no Existe')
        return res.status(400).json({msg:error.message})
    }
    
    try {
        user.token = generateId()

        await user.save()

        forgetPasswordEmail({email:user.email, name:user.email, token:user.token})

        res.json({msg: 'Hemos enviado un Email con las Instrucciones'})

    } catch (error) {
        console.log(error)
    }
} 

export const validateToken = async(req,res) =>{

    const {token} = req.params

    try {
        const tokenValidate = await User.findOne({token})

        if(!tokenValidate) {
            const error = new Error('Token no Válido')
            return res.status(400).json({msg:error.message})
        }
        
        res.json({msg: 'Token valido y el usuario existe'})
        
    } catch (error) {
        console.log(error)
    }
} 

export const newPassword = async(req,res) =>{

    const {token} = req.params
    const {password} = req.body

    try {
        const user = await User.findOne({token})

        if(!user) {
            const error = new Error('Token no Válido')
            return res.status(400).json({msg:error.message})
        }

        user.password = password
        user.token = ''

        await user.save()
        
        res.json({msg: 'Contraseña Modificada Correctamente'})
        
    } catch (error) {
        console.log(error)
    }
} 

export const profile = async(req,res) =>{

    const {user} = req
   
    res.json(user)
} 