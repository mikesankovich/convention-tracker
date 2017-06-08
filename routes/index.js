'use strict';

var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var config = require('../config');
var jwt = require('jwt-simple');
var request = require('request');

var Authentication = require('../controllers/authentication');
var passportService = require('../services/passport');
var passport = require('passport');

var requireAuth = passport.authenticate('jwt', { session: false }); //token based, not session
var requireSignin = passport.authenticate('local', { session: false });
var authenticate = expressJwt({ secret: config.secret });

var User = require('../models/user');

router.get('/api', requireAuth, Authentication.getUser);
router.put('/api/addfollower', requireAuth, Authentication.addFollower);
router.put('/api/removefollower', requireAuth, Authentication.removeFollower);
router.get('/api/user/:id', Authentication.getUserProfile);
router.post('/api/signup', Authentication.signup);
router.post('/api/signin', requireSignin, Authentication.signin);
router.post('/api/editInfo', Authentication.editInfo);

module.exports = router;