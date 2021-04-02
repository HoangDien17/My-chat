const express = require('express');
const route = express.Router();

const openAppController = require('../controllers/OpenAppController');
const authenticateMiddleware = require('../authenticateMiddleware/authMiddleware');

route.get('/', authenticateMiddleware.CheckLoggedOut, openAppController.index);

module.exports = route;

