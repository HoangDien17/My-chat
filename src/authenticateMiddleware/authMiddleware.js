
class Middleware {
  CheckLoggedIn (req, res, next) {
    if(!req.isAuthenticated()) {
      return res.redirect('/login-register');
    }
    next();
  }
  CheckLoggedOut (req, res, next) {
    if(req.isAuthenticated()) {
      return res.redirect('/');
    }
    next();
  }
};

module.exports = new Middleware;
