const userModel = require('../models/userModel');
const { check, validationResult } = require('express-validator');
class SignUpController {
  index(req, res){
    res.render('signup', {layout:'main_signup', errors: req.flash("errors")})
  };
  postSignUp(req, res, next){
    var errorArray = [];
    var validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
      var errors = Object.values(validationErrors.mapped());
      errors.forEach(item => {
        errorArray.push(item.msg);
      });
      req.flash("errors", errorArray)
      return res.redirect('/signup')
    }
    
  }
}

module.exports = new SignUpController;

