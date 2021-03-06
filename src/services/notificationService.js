const NotificationModel = require('../models/notificationModel');
const UserModel = require('../models/userModel');

let loadNotification = (receivedID, limit) => {
  return new Promise(async (resolve, reject) => {
    let notifiByUser = await NotificationModel.model.findNotificationByUser(receivedID, limit);
    let notification_user = notifiByUser.map(async (notification) => {
      let sender = await UserModel.findUserById(notification.senderId);
      return NotificationModel.NOTIFICATION_CONTENT.getContent(notification.type, sender.avatar, sender.username, sender._id);
    });
    resolve(await Promise.all(notification_user));
  })
}

let showRequestContact = (receivedID, limit) => {
  return new Promise(async (resolve, reject) => {
    let userSender = [];
    let notifiByUser = await NotificationModel.model.findNotificationByUser(receivedID, limit);
    notifiByUser.forEach((notification) => {
      let sender = UserModel.findUserById(notification.senderId);
      userSender.push(sender)
    });
    resolve(await Promise.all(userSender));
  })
}

let countNotiByUser = (Userid) => {
  return new Promise(async (resolve, reject) => {
    let resultCount = await NotificationModel.model.countNotificationByUser(Userid);
    resolve(resultCount);
  })
}

let isReadNoti = (senderId, receiverId) => {
  return new Promise (async (resolve, reject) => {
    let updateStatus = await NotificationModel.model.updateStatusNoti(senderId, receiverId);
    resolve(updateStatus);
  })
}


module.exports = {loadNotification, showRequestContact, countNotiByUser, isReadNoti};
