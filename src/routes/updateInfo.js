const express = require('express');
const route = express.Router();
const authenticateMiddleware = require('../authenticateMiddleware/authMiddleware');
const updateValidationUser = require('../validation/updateUserValidation');

const updateUserController = require('../controllers/UpdateUserController');

route.put('/', authenticateMiddleware.CheckLoggedIn, updateValidationUser.updateUser, updateUserController.updateInfo);

module.exports = route;

