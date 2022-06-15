const multer = require('multer')
const shortid = require('shortid')
const fs = require('fs')
const Links = require('../models/Links')

exports.addFile = (req,res,next) => {


    const multerConfig = {
        limits: {fileSize: req.user ? 1024 *1024 *10 : 1024*1024},
        storage: fileStorage = multer.diskStorage({
    
            destination: (req, file,callback) => {
                callback(null, __dirname+'/../uploads')
            },
            filename: (req, file,callback) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.', file.originalname.length))
                callback(null,`${shortid.generate()}${extension}`)
            },
        })
    } 
    
    const upload = multer(multerConfig).single('archive')

    upload(req, res, async(error) =>{
        
        if(!error){
            return res.json({file:req.file.filename})
        }
        console.log(error,'hi!!!!!')
        return next()
    })
   
}

exports.deleteFile = (req,res) => {
    

    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.file}`)
        
    } catch (error) {
        console.log(error)
    }
}

exports.downloadFile = async(req,res, next) => {
    const archive = __dirname + '/../uploads/' + req.params.archive
    
    const link = await Links.findOne({name: req.params.archive})

    res.download(archive)

   
    
    if(link.downloads === 1){

        req.file = link.name

        await Links.findOneAndRemove(link.id)

        next()
    }
    else{
        link.downloads--
        await link.save()
    }

  
}