const express = require('express');
const route = express.Router();
const authenticateMiddleware = require('../authenticateMiddleware/authMiddleware');

const listFriendController = require('../controllers/ListFriendController');

route.get('/', authenticateMiddleware.CheckLoggedIn, listFriendController);

module.exports = route;

