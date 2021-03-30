const userModel = require('../models/userModel');
const { check, validationResult } = require('express-validator');
const auth = require('../services/auth');
const { transSuccess } = require('../../lang/vi');
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
      await auth.register(req.body.email, req.body.gender, req.body.pass);
      successArray.push(transSuccess.registration_success);
      req.flash("successes", successArray);
      return res.redirect('/signup');
    } catch (error) {
      errorArray.push(error)
    }
    
    
  }
}

module.exports = new SignUpController;

