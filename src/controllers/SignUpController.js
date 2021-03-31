const userModel = require('../models/userModel');
const { check, validationResult } = require('express-validator');
const auth = require('../services/auth');
class SignUpController {
  index(req, res){
    res.render('signup', {layout:'main_login_register', errors: req.flash("errors"), successes: req.flash("successes")});
  };
  async postSignUp(req, res, next){
    var errorArray = [];
    var successArray = [];
    var validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
      var errors = Object.values(validationErrors.mapped());
      errors.forEach(item => {
        errorArray.push(item.msg);
      });
      req.flash("errors", errorArray)
      return res.redirect('/signup')
    }
    try {
      let userCreated = await auth.register(req.body.email, req.body.gender, req.body.pass, req.protocol, req.get("host"));
      successArray.push(userCreated);
      req.flash("successes", successArray);
      return res.redirect('/login');
    } catch (error) {
      errorArray.push(error);
      req.flash("errors", errorArray);
      res.redirect('/signup');
    }
    
    
  }
}

module.exports = new SignUpController;

