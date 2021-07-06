const express = require('express');
const route = express.Router();
const authenticateMiddleware = require('../authenticateMiddleware/authMiddleware');

const getContactController = require('../controllers/GetContactController');

route.get('/', authenticateMiddleware.CheckLoggedIn, getContactController);

module.exports = route;

