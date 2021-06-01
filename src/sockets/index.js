const addNewContact = require('./contact/addNewContact');
const removeRequestContact = require('./contact/removeRequestContact');
const addToListFriend = require('./contact/addToFriend');
const deleteContact = require('./contact/deleteContact');

let initSockets = (io) => {
  addNewContact(io);
  removeRequestContact(io);
  addToListFriend(io);
  deleteContact(io);
};

module.exports = initSockets;
