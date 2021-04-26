const UserModel = require('../models/userModel');
const contact = require('../services/contactService');
const {mongooseArrayToObject, mongooseToObject} = require('../ultil/mongoose');
class HomeController {
  async index(req, res, next){
    try {
      let currentId = req.user._id;
      let user = req.user
      let friendContacts = await contact.listFriendContact(currentId)
      friendContacts = mongooseArrayToObject(friendContacts)
      user = mongooseToObject(user);
      res.render('home', {layout:'main', user, friendContacts});
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

module.exports = new HomeController;

