const contact = require('../services/contactService');

let deleteFriend = async (req, res) => {
  currentId = req.user._id;
  contactId = req.body.idDelete;
  await contact.UnFriend(currentId, contactId);
};

module.exports = deleteFriend;
