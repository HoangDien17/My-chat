const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ContactSchema = new Schema({
  userId: String,
  contactId: String,
  status: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null },
});
ContactSchema.statics = {
  findAllByUser(currentId) {
    return this.find({
      $or: [
        { "userId": currentId },
        { "contactId": currentId }
      ]
    }).exec()
  },
  findListFriendContact(currentId) {
    return this.find({
      $and:
        [
          { "status": true },
          {
            $or:
              [
                { "userId": currentId },
                { "contactId": currentId }
              ]
          }]
    }).exec()
  }
}

module.exports = mongoose.model("contact", ContactSchema);
