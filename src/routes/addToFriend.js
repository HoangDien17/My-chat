const express = require('express');
const route = express.Router();
const authenticateMiddleware = require('../authenticateMiddleware/authMiddleware');

const addToFriendController = require('../controllers/AddToFriendController');

route.put('/', authenticateMiddleware.CheckLoggedIn, addToFriendController);

module.exports = route;

