const express = require('express');
const route = express.Router();
const authenticateMiddleware = require('../authenticateMiddleware/authMiddleware');

const deleteFriendController = require('../controllers/DeleteFriendController');

route.delete('/', authenticateMiddleware.CheckLoggedIn, deleteFriendController);

module.exports = route;

