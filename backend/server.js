const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
port = 3000

app.use(cors())

mongoose.connect(process.env.db_url)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Conectado a base de dados'))

app.use(express.json())

const agendaRouter = require('./routes/agenda')
app.use('/agenda', agendaRouter)

app.listen(port, ()=>{
    console.log('Servidor rodando')
})

