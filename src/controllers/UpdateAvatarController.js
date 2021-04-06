const multer = require('multer');
const {app} = require('../config/app');
const {transValidation} = require('../../lang/vi');
const { v4: uuidv4 } = require('uuid');

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
  avatarUpload(req, res, (error) => {
    if(error) {
      if (error.code == 'LIMIT_FILE_SIZE') {
        res.status(500).send(transValidation.avatar_limitsize);
      }
      res.status(500).send(error);
    }
  })
}
module.exports = { updateAvatar };
