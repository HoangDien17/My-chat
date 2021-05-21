const contact = require('../services/contactService');

let LoadRequestContactController = async (req, res) => {
  try {
    let currentId = req.user._id;
    let allRequestContact = await contact.findAllRequestContact(currentId);
    res.status(200).json(allRequestContact);
  } catch (error) {
    res.status(500).send(error)
  }
};

module.exports = LoadRequestContactController;
