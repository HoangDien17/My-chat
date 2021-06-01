const ContactModel = require('../models/contactModel');
const UserModel = require('../models/userModel');
const _ = require('lodash');
const NotificationModel = require('../models/notificationModel');

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
    let notifiType = NotificationModel.NOTIFICATION_TYPE.ADD_CONTACT;
    let removeRequestContact = await ContactModel.removeRequestContact(currentId, contactId)
    await NotificationModel.model.removeNotificationAddContact(currentId, contactId, notifiType);
    if(removeRequestContact.n === 0) {
      return reject(false);
    }
    resolve(true);
  });
};

let AcceptRequestContact = (senderId, receiverId) => {
  return new Promise(async (resolve, reject) => {
    let notifiType = NotificationModel.NOTIFICATION_TYPE.ADD_CONTACT;
    await NotificationModel.model.removeNotificationAddContact(receiverId, senderId, notifiType);
    let userReceiver = await UserModel.findUserById(receiverId);
    let resultAcceptRequest = await ContactModel.acceptRequestContact(senderId, receiverId);
    resolve({resultAcceptRequest, userReceiver});
  })
};


let NotificationContact = (currentId, contactId) => {
  return new Promise(async (resolve, reject) => {
    let notificationItem = {
      senderId: currentId,
      receiverId: contactId,
      type: NotificationModel.NOTIFICATION_TYPE.ADD_CONTACT
    }

    let notification = await NotificationModel.model.createNewNotifi(notificationItem);
    resolve(notification);
  })
}

let UnFriend = (currentId, contactId) => {
  return new Promise (async (resolve, reject) => {
    let unfriend = await ContactModel.deleteFriendContact(currentId, contactId);
    resolve(unfriend);
  })
};

let RejectRequestContact = (senderId, receiverId) => {
  return new Promise(async (resolve, reject) => {
    let typeNoti = NotificationModel.NOTIFICATION_TYPE.ADD_CONTACT;
    await NotificationModel.model.removeNotificationAddContact(senderId, receiverId, typeNoti);
    let rejectReq = await ContactModel.rejectRequestContact(senderId, receiverId);
    resolve(rejectReq);
  })
}

let findAllRequestContact = (currentId) => {
  return new Promise(async (resolve, reject) => {
    let contactRequest = await ContactModel.findContactByCurrentId(currentId);
    let allRequestContact = [];
    contactRequest.forEach(item => {
      let infoContact = UserModel.findUserById(item.contactId);
      allRequestContact.push(infoContact)
    });
    resolve(await Promise.all(allRequestContact));
  })
};

module.exports = {findUsersContact, listFriendContact, AddNew, RemoveRequest, NotificationContact, AcceptRequestContact, UnFriend, RejectRequestContact, findAllRequestContact};
