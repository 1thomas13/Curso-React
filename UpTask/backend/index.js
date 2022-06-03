import express from 'express'
import dotenv from 'dotenv'
import { connectionDB } from './config/db.js'
import userRoutes from './routes/user.js'
import projectsRoutes from './routes/Projects.js'
import tasksRoutes from './routes/task.js'
import cors from 'cors'

dotenv.config()
const app = express()
app.use(express.json())

connectionDB()

const whitelist = [process.env.FRONT_URL]

const corsOptions = {
    origin: function(origin,callback){
        if(whitelist.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error("Error Cors"))
        }
    },
}

app.use(cors(corsOptions))

app.use('/api/user', userRoutes)
app.use('/api/projects', projectsRoutes)
app.use('/api/tasks', tasksRoutes)

const PORT = process.env.PORT || 4000

const server = app.listen(PORT, () =>{
    console.log(`servidor corriendo en el puerto ${PORT}`)
})

import {Server} from 'socket.io'

const io = new Server(server, {
    pingTimeout:60000,
    cors:{
        origin:process.env.FRONT_URL
    }
})

io.on('connection',(socket) => {
    console.log('Conectado a socket.io')

    socket.on('openProject', (projectId) => {
        socket.join(projectId)

    })

    socket.on('createTask', (task) => {
        const project = task.project
        socket.to(project).emit('addTask',task)
    })

    socket.on('deleteTask', (task) => {
        const project = task.project
        socket.to(project).emit('deletedTask',task)
    })

    socket.on('updateTask', (task) => {
        const project = task.project._id
        socket.to(project).emit('updatedTask',task)
    })

    socket.on('changeState', (task) => {
        const project = task.project._id
        socket.to(project).emit('changedTask',task)
    })
    

    socket.emit('resp')
})