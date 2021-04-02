const express = require('express');
const passport = require('passport');
const route = express.Router();
const initPassportLocal = require('../controllers/passport/local');
const authenticateMiddleware = require('../authenticateMiddleware/authMiddleware');
initPassportLocal();

const loginController = require('../controllers/LoginController');

route.get('/', authenticateMiddleware.CheckLoggedOut, loginController.index);
route.post('/', authenticateMiddleware.CheckLoggedOut, passport.authenticate("local", {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true,
  successFlash : true
}));

module.exports = route;

