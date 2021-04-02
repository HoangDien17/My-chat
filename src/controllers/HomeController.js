const UserModel = require('../models/userModel');
class HomeController {
  index(req, res, next){
    let UserId = req.session.passport.user;
    UserModel.findUserById(UserId)
    .then(user => {
      user = user.toObject()
      res.render('home', {layout:'main', user})
    })
    .catch(next)
  };
}

module.exports = new HomeController;

