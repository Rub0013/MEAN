const express = require('express');
const app = express();
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/test';
const jwt = require("jsonwebtoken");
const privateKey = '31FvVSm4XvjYOh5Y';
const config = require('../passport/config');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');

passport.use(new FacebookStrategy({
        clientID: config.facebook_api_key,
        clientSecret: config.facebook_api_secret,
        callbackURL: config.callback_url,
        profileFields: config.fields
    },
    function(accessToken, refreshToken, profile, done) {
        const userFavebook = profile._json;
        mongo.connect(url, function (err, db) {
            db.collection("users").findAndModify(
                { '_id': userFavebook.id },
                [],
                {
                    $set: {
                        'name': userFavebook.name,
                        'email': userFavebook.email,
                        'imageURL': userFavebook.picture.data.url
                    }
                },
                { upsert: true },
                { new: true },
                function(err,doc) {
                    if (err) { return done(err); }
                    else {
                        const user = {
                            '_id': userFavebook.id,
                            'name': userFavebook.name,
                            'email': userFavebook.email,
                            'imageURL': userFavebook.picture.data.url
                        };
                        done(null, user);
                    }
                    db.close();
                }
            );
        });
    }
));

router.get('/callback', passport.authenticate('facebook', { failureRedirect: 'http://localhost:4200/login', session: false }), function(req, res, next) {
    const id = req.user._id;
    res.redirect('http://localhost:4200/auth/facebook/' + id);
});

router.get('/', passport.authenticate('facebook', { scope: 'email', session: false }), function(req, res, next) {

});


module.exports = router;
