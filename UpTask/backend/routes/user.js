import express from 'express'
import { createUser,auth,confirm,forgetPassword,validateToken,profile,newPassword } from '../controllers/user.js'
import { checkAuth } from '../middleware/checkAuth.js'

const router = express.Router()

router.post('/', createUser)
router.post('/login', auth)
router.get('/confirm/:token', confirm)
router.post('/forgetPassword', forgetPassword)

router.get('/forgetPassword/:token', validateToken)
router.post('/forgetPassword/:token', newPassword)

router.get('/profile', checkAuth,profile)

export default router