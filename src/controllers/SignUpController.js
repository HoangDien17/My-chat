
class SignUpController {
  index(req, res){
    res.render('signup', {layout:'main_signup'})
  };
}

module.exports = new SignUpController;

