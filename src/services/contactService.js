const ContactModel = require('../models/contactModel');
const UserModel = require('../models/userModel');
const _ = require('lodash');

let findUsersContact = (currentUserId, keyword) => {
  return new Promise(async (resolve, reject) => {
    let deprecatedUserIds = [currentUserId];
    let contactsByUser = await ContactModel.findAllByUser(currentUserId);
    contactsByUser.forEach((contact) => {
      deprecatedUserIds.push(contact.userId);
      deprecatedUserIds.push(contact.contactId);
    })
    deprecatedUserIds = _.uniqBy(deprecatedUserIds);  // Loại bỏ các phần tử trùng nhau.
    let users = await UserModel.findAllForAddContact(deprecatedUserIds, keyword);
    resolve(users);
  });
}

module.exports = {findUsersContact};
