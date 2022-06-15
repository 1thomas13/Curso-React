const express = require('express')
const { newLink, getLink, allLinks, hasPassword, validatePassword} = require('../controllers/link')
const { deleteFile} = require('../controllers/files')
const router = express.Router()
const {check} = require('express-validator')
const authMiddle = require('../middleware/auth')

router.post('/',[
    check('originName', 'Sube un archivo').not().isEmpty(),
    check('name', 'Sube un archivo').not().isEmpty(),
], authMiddle, newLink)

router.get('/:url',hasPassword, getLink)

router.get('/', allLinks)

router.post('/:url', validatePassword, getLink)

module.exports = router