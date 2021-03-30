
class OpenAppController {
  index(req, res) {
    res.render('OpenApp', {layout:'main_login_register'});
  }
}
module.exports = new OpenAppController;
