import express from 'express'
import { addTask, deleteTask, getTask, setStateTask, updateTask } from '../controllers/task.js'
import { checkAuth } from '../middleware/checkAuth.js'

const router = express.Router()

router.post('/', checkAuth,addTask)

router.route('/:id')
    .get(checkAuth , getTask)
    .put(checkAuth ,updateTask)
    .delete(checkAuth ,deleteTask)

router.post('/state/:id',checkAuth , setStateTask)

export default router