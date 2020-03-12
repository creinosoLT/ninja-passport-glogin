const express = require('express')
const authRoutes = require('./routes/auth.routes')
const profileRoutes = require('./routes/profile.routes')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')

const app = express()
const PORT = process.env.PORT || 2000
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

app.set('view engine', 'ejs')

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}))

app.use(passport.initialize())

app.use(passport.session())

mongoose.connect(keys.mongodb.dbUri, mongoOptions, () => {
    console.log('Connected to MongoDB.')
})

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

app.get('/', (req, res) => {
    res.render('home', { user: req.user })
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})