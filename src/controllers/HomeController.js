const contact = require('../services/contactService');
const notification = require('../services/notificationService');
const { mongooseArrayToObject, mongooseToObject } = require('../ultil/mongoose');
class HomeController {
  async index(req, res) {
    try {
      let limit = 10;
      let currentId = req.user._id;
      let user = req.user
      let friendContacts = await contact.listFriendContact(currentId);
      let notifsByUser = await notification.loadNotification(currentId, limit)
      let userRequestSenders = await notification.showRequestContact(currentId, limit);

      // Xử lý notification đã và chưa xem
      let countNotiUnread = await notification.countNotiByUser(currentId);
    
      userRequestSenders = mongooseArrayToObject(userRequestSenders);
      friendContacts = mongooseArrayToObject(friendContacts);
      user = mongooseToObject(user);
      res.render('home', { layout: 'main', user, friendContacts, notifsByUser, userRequestSenders, countNotiUnread});
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new HomeController;

