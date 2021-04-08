const UserModel = require('../models/userModel');

let userUpdate = (id, item) => {
  return UserModel.updateUser(id, item)
};

module.exports = userUpdate;

