
class LoginController {
  index(req, res){
    res.render('login', {layout:'main_login'})
  };
}

module.exports = new LoginController;

