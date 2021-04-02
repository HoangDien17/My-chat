const { transSuccess } = require('../../lang/vi');

class LogOutController {
  index (req, res) {
    req.logout();
    req.flash("successes", transSuccess.logout_success);
    return res.redirect('/login-register');
  }
};

module.exports = new LogOutController;
