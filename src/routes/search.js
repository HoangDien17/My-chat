const express = require('express');
const route = express.Router();
const authenticateMiddleware = require('../authenticateMiddleware/authMiddleware');

const findUserContact = require('../controllers/FindUserContact');

route.get('/search-user/:keyword', authenticateMiddleware.CheckLoggedIn, findUserContact.findUserContact);

module.exports = route;

