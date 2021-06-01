const contact = require('../services/contactService');

let deleteFriend = async (req, res) => {
  try {
    currentId = req.user._id;
    contactId = req.body.idDelete;
    let resultDelete = await contact.UnFriend(currentId, contactId);
    res.status(200).json({success: !!resultDelete});
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = deleteFriend;
