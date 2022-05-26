import express from 'express'
import dotenv from 'dotenv'
import { connectionDB } from './config/db.js'
import userRoutes from './routes/user.js'

dotenv.config()
const app = express()
app.use(express.json())

connectionDB()


app.use('/api/user', userRoutes)


const PORT = process.env.PORT || 4000
app.listen(PORT, () =>{
    console.log(`servidor corriendo en el puerto ${PORT}`)
})