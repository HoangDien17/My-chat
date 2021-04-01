const express = require('express');
const passport = require('passport');
const route = express.Router();
const initPassportLocal = require('../controllers/passport/local');
initPassportLocal();

const loginController = require('../controllers/LoginController');

route.get('/', loginController.index);
route.post('/', passport.authenticate("local", {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true,
  successFlash : true
}));

module.exports = route;

