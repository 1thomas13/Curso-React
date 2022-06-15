const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const app = express ()
require('dotenv').config()

connectDB()

const port = process.env.PORT || 4000

app.use(express.json())

const configCors = {
    origin: process.env.URL_FRONT
}

app.use(cors(configCors))

app.use(express.static('uploads'))

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/links', require('./routes/links'))
app.use('/api/files', require('./routes/files'))

app.get('/', (req,res) => {
    res.status(200).json({msg:'Welcome to NodeSend API'})
})

app.listen(port, ()=> {
    console.log(`Listen in port: ${port}`)
})

