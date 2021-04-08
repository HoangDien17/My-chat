const { check } = require('express-validator');
const { transValidation } = require('../../lang/vi');

var updateUser = [
  check('username', transValidation.update_username)
    .optional()  // Chấp nhận giá trị khi người dùng không thay đổi update trường username
    .isLength({min: 3, max: 15})
    .matches(/^[\s0-9a-zA-Z_àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ ]+$/),
  check('gender', transValidation.update_gender)
    .optional()
    .isIn(["male", "female"]),
  check('address', transValidation.update_address)
    .optional()
    .isLength({min: 5, max: 30}),
  check('phone', transValidation.update_phone)
    .optional()
    .matches(/^(0)[0-9]{9,10}$/)
];
  
module.exports = {updateUser};
