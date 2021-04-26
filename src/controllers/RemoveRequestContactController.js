const contact = require('../services/contactService');

let removeRequestContactController = async (req, res) => {
  try {
    let currentId = req.user._id;
    let contactId = req.body.uid;
    let removeRequest = await contact.RemoveRequest(currentId, contactId);

    res.status(200).json({success: !!removeRequest});
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = removeRequestContactController;
