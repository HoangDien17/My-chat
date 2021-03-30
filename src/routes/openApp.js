const express = require('express');
const route = express.Router();

const openAppController = require('../controllers/OpenAppController');

route.get('/', openAppController.index);

module.exports = route;

