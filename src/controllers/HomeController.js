const UserModel = require('../models/userModel');
class HomeController {
  index(req, res, next){
    let user = req.user
    user = user.toObject()
    res.render('home', {layout:'main', user})
  };
}

module.exports = new HomeController;

