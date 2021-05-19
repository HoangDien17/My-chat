const contact = require('../services/contactService');

let AddToFriendController = async (req, res) => {
  try {
    let currentId = req.user._id;
    let contactId = req.body.id;
    await contact.AcceptRequestContact(currentId, contactId);
  } catch (error) {
    res.status(500).send(error)
  }
};

module.exports = AddToFriendController;
