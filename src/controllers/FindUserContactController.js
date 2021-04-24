const contact = require('../services/contactService');
const {mongooseArrayToObject, mongooseToObject} = require('../ultil/mongoose');

let findUserContact = async(req, res) => {
  try {
    let currentId = req.user._id;
    let keyword = req.params.keyword;
    let contacts = await contact.findUsersContact(currentId, keyword);
    contacts = mongooseArrayToObject(contacts);
    // contacts.forEach(item => {
    //   console.log(1);
    // })
    res.render("partials/modal-add-contact", {contacts});
  } catch (error) {
    res.status(500).send(error)
  }
};

module.exports = findUserContact ;
