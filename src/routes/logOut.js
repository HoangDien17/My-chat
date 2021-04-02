const express = require('express');
const route = express.Router();

const logoutController = require('../controllers/LogoutController');
const authenticateMiddleware = require('../authenticateMiddleware/authMiddleware');

route.get('/', authenticateMiddleware.CheckLoggedIn, logoutController.index);

module.exports = route;

