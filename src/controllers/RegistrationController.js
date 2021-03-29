const userModel = require('../../models/user');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const auth = require('../servers/authServer');

class RegistrationController {
    //Get login 
    index(req, res) {
        res.render('registration');
    }
    async postRegistration(req, res){
        var errorArr = [];
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            const errors = Object.values(validationErrors.mapped())
            errors.forEach(item => {
                errorArr.push(item.msg);
            });
            return res.render('registration', {messages:errorArr});
        }
        try {
            await auth.register(req.body.email, req.body.pass);  
            res.redirect('login');
        } catch (error) {
            errorArr.push(error)
            return res.render('registration', {messages:errorArr});
        }
    }
}
module.exports = new RegistrationController;
