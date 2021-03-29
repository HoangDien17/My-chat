const express = require('express');
const route = express.Router();
const validation = require('../validation/validation');
const signUpController = require('../controllers/SignUpController');

route.get('/', signUpController.index);
route.post('/', validation.register, signUpController.postSignUp);

module.exports = route;
