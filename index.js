const express = require('express')
const authRoutes = require('./routes/auth.routes')
const passportSetup = require('./config/passport-setup')

const app = express()
const PORT = process.env.PORT || 2000

app.set('view engine', 'ejs')

app.use('/auth', authRoutes)

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})