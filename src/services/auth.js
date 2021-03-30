const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { transError } = require('../../lang/vi');

const saltRounds = 7;
let register = (email, gender, pass) => {
  return new Promise (async(resolve, reject) => {
    let userByEmail = await UserModel.findByEmail(email);
    if(userByEmail){
      return reject(transError.account_in_use);
    }
    let salt = bcrypt.genSaltSync(saltRounds);
    let userItem = {
      username : email.split("@")[0],
      gender : gender,
      local : {
        email : email,
        password : bcrypt.hashSync(pass, salt),
        verifyToken : uuidv4()
      }
    }
    let user = await UserModel.createItem(userItem);
    resolve(user)
  })
};

module.exports = { register }
