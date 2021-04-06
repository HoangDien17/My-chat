const express = require('express');
const route = express.Router();
const authenticateMiddleware = require('../authenticateMiddleware/authMiddleware');

const avatarController = require('../controllers/UpdateAvatarController');

route.put('/', authenticateMiddleware.CheckLoggedIn, avatarController.updateAvatar);

module.exports = route;

