const addNewContact = require('./contact/addNewContact');
const removeRequestContact = require('./contact/removeRequestContact');
const addToListFriend = require('./contact/addToFriend');

let initSockets = (io) => {
  addNewContact(io);
  removeRequestContact(io);
  addToListFriend(io);
};

module.exports = initSockets;
