const express = require('express');
const route = express.Router();
const authenticateMiddleware = require('../authenticateMiddleware/authMiddleware');

const infoContactController = require('../controllers/InfoContactController');

route.post('/', authenticateMiddleware.CheckLoggedIn, infoContactController);

module.exports = route;

