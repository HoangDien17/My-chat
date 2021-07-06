const notification = require('../services/notificationService');
let isReadNoti = async (req, res) => {
  try {
    let senderId = req.body.confirmId;
    let receiverId = req.user._id
    let resultUpdate = await notification.isReadNoti(senderId, receiverId);
    res.status(200).send(resultUpdate);
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = { isReadNoti };