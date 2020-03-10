const router = require('express').Router()
const passport = require('passport')

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/logout', (req, res) => {
    res.send('LOGGING OUT...')
})

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log(res)
    res.send('On Google Redirect Callback!!!')
})

module.exports = router