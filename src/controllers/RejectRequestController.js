const contact = require('../services/contactService');

let rejectRequestController = async (req, res) => {
  try {
    let currentId = req.user._id;
    let contactId = req.body.id;
    let rejectRequest = await contact.RejectRequestContact(contactId, currentId);
    res.status(200).json({success: !!rejectRequest});
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = rejectRequestController;
