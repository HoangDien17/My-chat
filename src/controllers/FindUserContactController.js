const contact = require('../services/contactService');
const {mongooseArrayToObject, mongooseToObject} = require('../ultil/mongoose');

let findUserContact = async(req, res) => {
  try {
    let currentId = req.user._id;
    let keyword = req.body.keyword;
    let contacts = await contact.findUsersContact(currentId, keyword);
    contacts = mongooseArrayToObject(contacts);
    res.json(contacts)
  } catch (error) {
    res.status(500).send(error)
  }
};

module.exports = findUserContact ;
