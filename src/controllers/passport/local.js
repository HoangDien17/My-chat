const passport = require('passport');
const passportLocal = require('passport-local');
const UserModel = require('../../models/userModel');
const { transError, transSuccess } = require('../../../lang/vi');

let LocalStrategy = passportLocal.Strategy;

let initPassportLocal = () => {
  passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "pass",
    passReqToCallback: true
  }, async (req, email, pass, done) => {
    try {
      let user = await UserModel.findByEmail(email)
      if(!user) {
        return done(null, false, req.flash("errors", transError.login_failed));
      }
      if(!user.local.isActive){
        return done(null, false, req.flash("errors", transError.account_isNotActive));
      }
      let checkPassword = await user.comparePassword(pass)
      if(!checkPassword) {
        return done(null, false, req.flash("errors", transError.login_failed));
      }
      return done(null, user, req.flash("successes", transSuccess.loginSuccess(user.username)))
    } catch (error) {
      console.log(error);
      return done(null, false, transError.server_errors);
    }
  }));
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    UserModel.findUserById(id)
    .then(user => {
      return done(null, user);
    })
    .catch(error => {
      return done(error, null);
    })
  });
};

module.exports = initPassportLocal;
