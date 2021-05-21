const express = require('express');
const route = express.Router();
const authenticateMiddleware = require('../authenticateMiddleware/authMiddleware');

const loadRequestContactController = require('../controllers/LoadRequestContactController');

route.get('/', authenticateMiddleware.CheckLoggedIn, loadRequestContactController);

module.exports = route;

