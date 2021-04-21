const UserModel = require('../models/userModel');
const {mongooseArrayToObject, mongooseToObject} = require('../ultil/mongoose');
class HomeController {
  index(req, res, next){
    let user = req.user
    user = mongooseToObject(user);
    res.render('home', {layout:'main', user});
  };
}

module.exports = new HomeController;

