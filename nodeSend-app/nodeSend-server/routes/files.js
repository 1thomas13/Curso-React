const express = require('express')
const { addFile,downloadFile, deleteFile} = require('../controllers/files')
const router = express.Router()
const authMiddle = require('../middleware/auth')


router.post('/', authMiddle,addFile)


router.get('/:archive', downloadFile, deleteFile)

module.exports = router