'use strict';

var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var config = require('../config');
var jwt = require('jwt-simple');

var Convention = require('../models/convention');
var User = require('../models/user');

var ConventionController = require('../controllers/convention');

router.get('/convention/:id', ConventionController.findOneConvention);
router.get('/all', ConventionController.findAllConventions);
router.post('/myconventions', ConventionController.findMyConventions);
router.post('/new', ConventionController.newConvention);
router.post('/editConvention', ConventionController.editConvention);
router.delete('/deleteConvention/:id', ConventionController.deleteConvention);
module.exports = router;