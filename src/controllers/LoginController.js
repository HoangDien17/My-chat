
class LoginController {
  index(req, res){
    res.render('login', {layout:'main_login_register'})
  };
}

module.exports = new LoginController;

