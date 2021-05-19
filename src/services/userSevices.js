const UserModel = require('../models/userModel');

let userUpdate = (id, item) => {
  return UserModel.updateUser(id, item);
};

let userContact = (contactId) => {
  return new Promise(async (resolve, reject) => {
    let infoContact = await UserModel.findUserById(contactId);
    resolve(infoContact)
  })
}

module.exports = { userUpdate, userContact };

