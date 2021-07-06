const multer = require('multer');
const {app} = require('../config/app');
const {transValidation, transSuccess} = require('../../lang/vi');
const { v4: uuidv4 } = require('uuid');
const User = require('../services/userSevices');
const fsExtra = require('fs-extra');
const { check, validationResult } = require('express-validator');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, app.avatar_directory)
  },
  filename: (req, file, cb) => {
    let math = app.avatar_type;
    if(math.indexOf(file.mimetype) === -1) {
      return cb(transValidation.avatar_type, null);
    }
    let avatarName = `${Date.now()}-${uuidv4()}-${file.originalname}`
    cb(null, avatarName)
  }
});

let avatarUpload = multer({ 
  storage: storage,
  limits: {fileSize: app.avatar_limitsize}
}).single("profile-avatar")

let updateAvatar = (req, res) => {
  avatarUpload(req, res, async (error) => {
    if(error) {
      if (error.code == 'LIMIT_FILE_SIZE') {
        return res.status(500).send(transValidation.avatar_limitsize);
      }
      return res.status(500).send(error);
    };
    try {
      let userAvatarItem = {
        avatar: req.file.filename,
        updatedAt: Date.now()
      }
      let updateUser = await User.userUpdate(req.user._id, userAvatarItem);
      // remove avatar cũ trong folder public/img
      await fsExtra.remove(`${app.avatar_directory}/${updateUser.avatar}`);
      /* Chú ý: sau khi update thành công , return vẫn trả về dữ liệu cũ. */

      let result = {
        message: transSuccess.info_user_updated,
        imageSrc: `/img/avatar/${req.file.filename}`
      }
      res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
  })
};

let updateInfo = async (req, res) => {
  var errorArray = [];
  var validationErrors = validationResult(req);
  if(!validationErrors.isEmpty()){
    var errors = Object.values(validationErrors.mapped());
    errors.forEach(item => {
      errorArray.push(item.msg);
    });
    return res.status(500).send(errorArray)
    }
  try {
    let userInfoItem = req.body;
    await User.userUpdate(req.user._id, userInfoItem);
    let result = {
      message: transSuccess.info_user_updated,
    }
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
      res.status(500).send(error)
  }
};

module.exports = { updateAvatar, updateInfo};
