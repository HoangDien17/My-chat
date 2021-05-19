const user = require('../services/userSevices');

let InfoContactController = async (req, res) => {
  try {
    let contactId = req.body.id;
    let infoContact = await user.userContact(contactId);
    res.status(200).json(infoContact);
  } catch (error) {
    res.status(500).send(error)
  }
};

module.exports = InfoContactController;
