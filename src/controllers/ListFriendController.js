
const contact = require('../services/contactService');
const {mongooseArrayToObject} = require('../ultil/mongoose');

let ListFriendController = async(req, res) => {
  try {
    let currentId = req.user._id;
    console.log(currentId);
    let friendContacts = await contact.listFriendContact(currentId)
    console.log(friendContacts);
    friendContacts = mongooseArrayToObject(friendContacts)
    // res.render("partials/list-friend", {friendContacts});
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = ListFriendController;
