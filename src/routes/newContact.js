const express = require('express');
const route = express.Router();
const authenticateMiddleware = require('../authenticateMiddleware/authMiddleware');

const addContactController = require('../controllers/AddContactController');

route.post('/', authenticateMiddleware.CheckLoggedIn, addContactController);

module.exports = route;

