const express = require('express')
const authRoutes = require('./routes/auth.routes')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys')

const app = express()
const PORT = process.env.PORT || 2000
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

app.set('view engine', 'ejs')

mongoose.connect(keys.mongodb.dbUri, mongoOptions, () => {
    console.log('Connected to MongoDB.')
})

app.use('/auth', authRoutes)

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})