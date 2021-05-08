const contact = require('../services/contactService');

let AddContactController = async (req, res) => {
  try {
    let currentId = req.user._id;
    let contactId = req.body.uid;
    let newContact = await contact.AddNew(currentId, contactId);
    let newNotification = await contact.notificationContact(currentId, contactId);
    res.status(200).json({success: !!newContact});
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = AddContactController;
