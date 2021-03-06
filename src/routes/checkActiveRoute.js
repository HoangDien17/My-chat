const express = require('express');
const route = express.Router();

const checkActiveController = require('../controllers/SignUpController');
const authenticateMiddleware = require('../authenticateMiddleware/authMiddleware');

route.get('/Verify/:Token', authenticateMiddleware.CheckLoggedOut, checkActiveController.getCheckActive);

module.exports = route;

