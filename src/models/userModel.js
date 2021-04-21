const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: String,
  gender: {type: String, default: "male"},
  phone: {type:String, default: null },
  address: {type: String, default: null},
  avatar: {type: String, default: "avatar-default.jpg"},
  role: {type: String, default: "user"},
  local: {
    email: {type: String, trim: true},
    password: String,
    isActive: {type: Boolean, default: false},
    verifyToken: String
  },
  facebook: {
    uid: String,
    token: String,
    email: {type: String, trim: true}
  },
  google: {
    uid: String,
    token: String,
    email: {type: String, trim: true}
  },
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: null},
  deletedAt: {type: Number, default: null},
});
UserSchema.statics = {
  createItem(item) {
    return this.create(item);
  },
  findByEmail(email) {
    return this.findOne({"local.email": email}).exec()
  },
  removeById(id) {
    return this.findByIdAndRemove(id).exec()
  },
  findByToken(token) {
    return this.findOne({"local.verifyToken": token}).exec();
  },
  verify(token) {
    return this.findOneAndUpdate(
      {"local.verifyToken": token},
      {"local.isActive": true, "local.verifyToken": null}
    ).exec()
  },
  findUserById(id) {
    return this.findById(id).exec()
  },
  updateUser(id, item) {
    return this.findByIdAndUpdate(id, item).exec();
  },
  findAllForAddContact(deprecatedUserIds, keyword) {
    return this.find({
      $and: [
        {"_id": {$nin: deprecatedUserIds}},
        {"local.isActive": true},
        {$or: [
          {"username": {"$regex": new RegExp(keyword, "i")}},
          {"local.email": {"$regex": new RegExp(keyword, "i")}}
        ]}
      ]
    }, {_id: 1, username: 1, address: 1, avatar: 1}).exec();
  }
}
UserSchema.methods = {
  comparePassword(password) {
    return bcrypt.compare(password, this.local.password)
  }
}

module.exports = mongoose.model("user", UserSchema);
