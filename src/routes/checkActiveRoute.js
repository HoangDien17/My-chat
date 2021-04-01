const express = require('express');
const route = express.Router();

const checkActiveController = require('../controllers/SignUpController');

route.get('/Verify/:Token', checkActiveController.getCheckActive);

module.exports = route;

