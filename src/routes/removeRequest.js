const express = require('express');
const route = express.Router();
const authenticateMiddleware = require('../authenticateMiddleware/authMiddleware');

const removeRequestContactController = require('../controllers/RemoveRequestContactController');

route.delete('/', authenticateMiddleware.CheckLoggedIn, removeRequestContactController);

module.exports = route;

