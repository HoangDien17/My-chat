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

module.exports = {loadNotification};
