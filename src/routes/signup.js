const express = require('express');
const route = express.Router();
const validation = require('../validation/validation');
const signUpController = require('../controllers/SignUpController');
const authenticateMiddleware = require('../authenticateMiddleware/authMiddleware');

route.get('/', authenticateMiddleware.CheckLoggedOut, signUpController.index);
route.post('/', authenticateMiddleware.CheckLoggedOut, validation.register, signUpController.postSignUp);

module.exports = route;
