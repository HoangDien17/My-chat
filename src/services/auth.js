const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { transError, transSuccess, transMail} = require('../../lang/vi');
const sendMail = require('../config/mailer');


const saltRounds = 7;
let register = (email, gender, pass, protocol, host) => {
  return new Promise (async(resolve, reject) => {
    let userByEmail = await UserModel.findByEmail(email);
    if(userByEmail){
      if(userByEmail.deletedAt != null) {
        return reject(transError.account_removed);
      }if(!userByEmail.local.isActive){
        return reject(transError.account_isNotActive);
      }
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
    let linkVerify = `${protocol}://${host}/Verify/${user.local.verifyToken}`
    sendMail(email, transMail.subject, transMail.template(linkVerify))
    .then(success => {
      resolve(transSuccess.userCreated(user.local.email));
    })
    .catch(async (error) => {
      console.log(error);
      //remove user
      await UserModel.removeById(user._id)
      reject(transMail.send_failed);
    });
  });
};
let verifyAccount = (token) => {
  return new Promise (async (resolve, reject) => {
    let UserByToken = await UserModel.findByToken(token)
    if(!UserByToken){
      reject(transError.account_Actived)
    }
    await UserModel.verify(token)
    resolve(transSuccess.account_actived)
  });
};

module.exports = { register , verifyAccount}
