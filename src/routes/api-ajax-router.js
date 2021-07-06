const express = require('express');
const router = express.Router();

const authenticateMiddleware = require('../authenticateMiddleware/authMiddleware');
const AjaxController = require('../controllers/AjaxController');

module.exports = (fix) => {
  fix.use("/ajax", authenticateMiddleware.CheckLoggedIn, router);
  router.put("/isRead", AjaxController.isReadNoti);
}
