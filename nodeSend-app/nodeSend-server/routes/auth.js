const express = require('express')
const {authUser, userAuthenticated  } = require('../controllers/Auth')
const router = express.Router()
const {check} = require('express-validator')
const authMiddle = require('../middleware/auth')

router.post('/',[
    check('email', 'Agrega un Email Valido').isEmail(),
    check('password', 'El password no puede ir vacio').not().isEmpty(),
], authUser)

router.get('/',authMiddle, userAuthenticated )

module.exports = router