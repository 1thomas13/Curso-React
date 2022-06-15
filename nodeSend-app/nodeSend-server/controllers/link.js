const Links = require('../models/Links')
const shortid = require('shortid')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')

exports.newLink = async(req,res)=> {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {originName, name} = req.body

    const link = new Links()
    link.url = shortid.generate()
    link.name = name
    link.originName = originName
    
    if(req.user) {
        const {password, downloads} = req.body

        if(downloads){
            link.downloads = downloads
        }
        if(password){
            const salt = await bcrypt.genSalt(10)
            link.password = await bcrypt.hash(password, salt)
        }

        link.author = req.user.id
    }

   try {
    await link.save()

    res.json({msg: `${link.url}`})
   } catch (error) {
    res.json({error})
   }
}

exports.getLink = async(req,res,next) => {

    const {url} = req.params

    const link = await Links.findOne({url:url})

    if(!link) {
        return res.status(401).json({msg: 'Ese Link no Existe'})
    }

    return res.send({password:false, file: link.name })
  
}

exports.allLinks = async(req,res) =>{
    try{
        
        const links = await Links.find({}).select('url -_id');
        res.json(links)

    }catch(err){
        console.log(err)
    }
}

exports.hasPassword = async(req,res,next) => {
    const {url} = req.params
    
    const link = await Links.findOne({url:url})

    if(!link) {
        return res.status(401).json({msg: 'Ese Link no Existe'})
    }

    if(link.password) {
        return res.json({password:true, file: link.name })
    }

    next()
}

exports.validatePassword = async(req,res,next) => {
    
    const password = req.body.password
    const {url} = req.params
    
    const link = await await Links.findOne({url})

    if(bcrypt.compareSync(password, link.password)){
        return next()
    }

    return res.status(401).json({msg:'Password Incorrecta'})
}