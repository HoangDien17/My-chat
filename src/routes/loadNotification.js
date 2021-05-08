const express = require('express');
const route = express.Router();
const authenticateMiddleware = require('../authenticateMiddleware/authMiddleware');

const loadNotiController = require('../controllers/LoadNotificationController');

route.get('/', authenticateMiddleware.CheckLoggedIn, loadNotiController);

module.exports = route;

