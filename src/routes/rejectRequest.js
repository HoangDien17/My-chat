const express = require('express');
const route = express.Router();
const authenticateMiddleware = require('../authenticateMiddleware/authMiddleware');

const rejectRequestController = require('../controllers/RejectRequestController');

route.delete('/', authenticateMiddleware.CheckLoggedIn, rejectRequestController);

module.exports = route;

