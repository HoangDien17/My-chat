const express = require('express');
const route = express.Router();
const authenticateMiddleware = require('../authenticateMiddleware/authMiddleware');

const findUserContactController = require('../controllers/FindUserContactController');

route.get('/search-user/:keyword', authenticateMiddleware.CheckLoggedIn, findUserContactController);

module.exports = route;

