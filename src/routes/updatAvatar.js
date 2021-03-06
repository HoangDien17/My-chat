const express = require('express');
const route = express.Router();
const authenticateMiddleware = require('../authenticateMiddleware/authMiddleware');

const updateUserController = require('../controllers/UpdateUserController');

route.put('/', authenticateMiddleware.CheckLoggedIn, updateUserController.updateAvatar);

module.exports = route;

