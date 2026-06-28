const express = require('express')
const postRoutes = require('./routes/postRoutes')

const app = express()

app.use(express.json())

// ROTAS
app.use('/', postRoutes)

module.exports = app