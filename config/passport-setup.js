const passport = require('passport')
const keys = require('./keys')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/user.model')

passport.use(new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
            console.log(`User ${profile.displayName} with ID:${profile.id} is already in the DB.`)
        } else {
            new User({
                username: profile.displayName,
                googleId: profile.id
            }).save().then((newUser) => {
                console.log('New User: ', newUser)
            })
        }
    })

}))