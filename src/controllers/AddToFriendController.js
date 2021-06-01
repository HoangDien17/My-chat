const contact = require('../services/contactService');

let AddToFriendController = async (req, res) => {
  try {
    let currentId = req.user._id;
    let contactId = req.body.id;
    let result = await contact.AcceptRequestContact(currentId, contactId);
    res.status(200).json({success: !!result.resultAcceptRequest, user: result.userReceiver});
  } catch (error) {
    res.status(500).send(error)
  }
};

module.exports = AddToFriendController;
