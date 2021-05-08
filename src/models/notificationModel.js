const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NotificationSchema = new Schema({
  senderId: String,
  receiverId: String,
  type: String,
  isRead: {type: Boolean, default: false},
  createdAt: {type: Number, default: Date.now}
});

NotificationSchema.statics = {
  createNewNotifi(item) {
    return this.create(item);
  },
  removeNotificationAddContact(currentId, contactId, type) {
    return this.deleteOne({
      $and: [
        {"senderId": currentId},
        {"receiverId": contactId},
        {"type": type}
      ]
    }).exec();
  }
}

const NOTIFICATION_TYPE = {
  ADD_CONTACT: "add_contact"
}
let model = mongoose.model("notification", NotificationSchema);

module.exports = { NOTIFICATION_TYPE, model};
