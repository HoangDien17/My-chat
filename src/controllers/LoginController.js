
class LoginController {
  index(req, res){
    res.render('login', {layout:'main_login_register',errors: req.flash("errors"), successes: req.flash("successes")})
  };
}

module.exports = new LoginController;

