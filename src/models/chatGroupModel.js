const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ChatGroupSchema = new Schema({
  name: String,
  userTotal: {type: Number, min: 3, max: 50},
  messageTotal: {type: Number, default: 0},
  userId: String,
  members: [
    {userId: String}
  ],
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: null},
  deletedAt: {type: Number, default: null},
});

module.exports = mongoose.model("chat-group", ChatGroupSchema);
