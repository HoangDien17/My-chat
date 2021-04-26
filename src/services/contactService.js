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

let listFriendContact = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    let list = [];
    let contactsByUser = await ContactModel.findListFriendContact(currentUserId);
    contactsByUser.forEach((contact) => {
      list.push(contact.userId)
      list.push(contact.contactId)
    })
    list = _.uniqBy(list);
    let users = await UserModel.findListFriendUser(list, currentUserId);
    resolve(users);
  })
}

let AddNew = (currentId, contactId) => {
  return new Promise(async (resolve, reject) => {
    let contact = await ContactModel.checkExistFriend(currentId, contactId)
    if(contact) {
      return reject(false);
    }
    let newContactItem = {
      userId: currentId,
      contactId: contactId
    }
    let newContact = await ContactModel.createItem(newContactItem);
    resolve(newContact);
  });
}

let RemoveRequest = (currentId, contactId) => {
  return new Promise(async (resolve, reject) => {
    let removeRequestContact = await ContactModel.removeRequestContact(currentId, contactId)
    if(removeRequestContact.n === 0) {
      return reject(false);
    }
    resolve(true);
  });
}

module.exports = {findUsersContact, listFriendContact, AddNew, RemoveRequest};
