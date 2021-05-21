const contact = require('../services/contactService');
const user = require('../services/userSevices');

let AddContactController = async (req, res) => {
  try {
    let currentId = req.user._id;
    let contactId = req.body.uid;
    let newContact = await contact.AddNew(currentId, contactId);
    let infoContact = await user.userContact(contactId);
    
    let newNotification = await contact.NotificationContact(currentId, contactId);
    res.status(200).json({success: !!newContact, infoContact});
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = AddContactController;
