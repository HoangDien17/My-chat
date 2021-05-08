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
  createItem(item){
    return this.create(item);
  },
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
  },
  checkExistFriend(currentId, contactId) {
    return this.findOne({
      $or: [
        {
          $and: [
            { "userId": currentId},
            { "contactId": contactId}
          ]
        },
        {
          $and: [
            { "userId": contactId},
            { "contactId": currentId}
          ]
        }
      ]
    }).exec();
  },
  removeRequestContact(currentId, contactId) {
    return this.deleteOne({
      $and: [
        { "userId": currentId },
        { "contactId": contactId }
      ]
    }).exec();
  }
}

module.exports = mongoose.model("contact", ContactSchema);
