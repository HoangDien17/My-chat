const contact = require('../services/contactService');

let GetContactController = async (req, res) => {
  try {
    let currentId = req.user._id;
    let userContact = await contact.listFriendContact(currentId);
    res.status(200).json(userContact);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = GetContactController;
