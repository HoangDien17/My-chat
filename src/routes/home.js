const express = require('express');
const route = express.Router();
const authenticateMiddleware = require('../authenticateMiddleware/authMiddleware');

const homeController = require('../controllers/HomeController');

route.get('/', authenticateMiddleware.CheckLoggedIn, homeController.index);

module.exports = route;

