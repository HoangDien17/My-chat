const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NotificationSchema = new Schema({
  senderId: String,
  receiverId: String,
  type: String,
  isRead: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now }
});

NotificationSchema.statics = {
  createNewNotifi(item) {
    return this.create(item);
  },
  removeNotificationAddContact(currentId, contactId, type) {
    return this.deleteOne({
      $and: [
        { "senderId": currentId },
        { "receiverId": contactId },
        { "type": type }
      ]
    }).exec();
  },
  findNotificationByUser(id, limit) {
    return this.find({
      "receiverId": id
    }).sort({ createdAt: -1 }).limit(limit).exec();
  },
  countNotificationByUser(id) {
    return this.countDocuments({
      $and: [{
        "receiverId": id
      }, {
        "isRead": false}]
    }).exec()
  },
  updateStatusNoti(senderId, receiverId) {
    return this.findOneAndUpdate({
      $and: [{"senderId": senderId}, {"receiverId": receiverId}]
    }, {"isRead": true}).exec()
  }
}
const NOTIFICATION_TYPE = {
  ADD_CONTACT: "add_contact"
}

const NOTIFICATION_CONTENT = {
  getContent: (type, avatar, username, userId) => {
    if (type === NOTIFICATION_TYPE.ADD_CONTACT) {
      return `<div class="big-border" data-id="${userId}">
                <div class="avatar-notification">
                  <img src="/img/avatar/${avatar}" alt="avatar">
                </div>
                <div class="content-notifi">
                  <strong>${username}</strong> đã gửi cho bạn một lời mời kết bạn!
                </div>
              </div>`
    }
  }
}

let model = mongoose.model("notification", NotificationSchema);

module.exports = { NOTIFICATION_TYPE, model , NOTIFICATION_CONTENT};
