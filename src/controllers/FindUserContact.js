const contact = require('../services/contactService');

let findUserContact = async(req, res) => {
  try {
    let currentId = req.user._id;
    let keyword = req.params.keyword;
    let users = await contact.findUsersContact(currentId, keyword);
    console.log(users);
  } catch (error) {
    res.status(500).send(error)
  }
};

module.exports = { findUserContact };
