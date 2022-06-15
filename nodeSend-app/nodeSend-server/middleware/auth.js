const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req,res,next) => {
    const authHeader = req.get('Authorization')

    if(authHeader) {

        const token = authHeader.split(' ')[1]
        if(token){
            try {
                const user = jwt.verify(token, process.env.SECRET_JWT)
                req.user = user
            } catch (error) {
                console.log(error);
                console.log('JWT no valido');
            }
        }
    }
    
    return next()
}