
let userAvatar = null;
let userInfo = {};
let originSrcAvatar = null;
let originUserInfo = {};

function updateAvatar() {
  $('#edit-username').bind("change", function(){
    let username = $(this).val();
    let regexUsername = new RegExp("^[\s0-9a-zA-Z_àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ ]+$")
    if(!regexUsername.test(username) || username.length < 3 || username.length > 15) {
      $.notify("Username giới hạn từ 3 - 15 ký tự và không chứa ký tự đặc biệt", "error");
      $(this).val(originUserInfo.username);
      delete userInfo.username;
      return false;
    }
    userInfo.username = $(this).val()
  });

  $('#input-phone-update').bind("change", function(){
    let phone = $(this).val();
    let regexPhone = new RegExp("^(0)[0-9]{9,10}$")
    if(!regexPhone.test(phone)) {
      $.notify("Số điện thoại Việt nam bắt đầu là số 0 và giới hạn từ 10 - 11 ký tự", "error");
      $(this).val(originUserInfo.phone);
      delete userInfo.phone;
      return false;
    }
    userInfo.phone = $(this).val()
  });

  $('#edit-gender-male').bind("click", function(){
    let gender = $(this).val();
    if(gender !== "male") {
      $.notify("Dữ liệu giới tính không chính xác.", "error");
      $(this).val(originUserInfo.gender);
      delete userInfo.gender;
    }
    userInfo.gender = $(this).val();
  });

  $('#edit-gender-female').bind("click", function(){
    let gender = $(this).val();
    if(gender !== "female") {
      $.notify("Dữ liệu giới tính không chính xác.", "error");
      $(this).val(originUserInfo.gender);
      delete userInfo.gender;
    }
    userInfo.gender = $(this).val();
  });

  $('#edit-address-update').bind("change", function(){
    let address = $(this).val();
    if(address.length < 3 || address.length > 30) {
      $.notify("Địa chỉ giới hạn từ 5 - 30 ký tự.", "error");
      $(this).val(originUserInfo.address);
      delete userInfo.address;
    }
    userInfo.address = $(this).val()
  });

  $('#button-update-avatar').click(function() {
    $('#profileAvatarPicker').click()
    $('#profileAvatarPicker').bind("change", function(){
      let fileData = $(this).prop("files")[0];
      let math = ["image/png", "image/jpg", "image/jpeg"];
      let limit = 1048576 // 1mb
      
      if($.inArray(fileData.type, math) == -1) {   // Kiểm tra xem kiểu file import có trùng trong mảng math không.
        $.notify("Kiểu file không hợp lệ, chỉ chấp nhận jpg, png.", "error");
        console.log(fileData.type);
        $(this).val(null);
        return false;
      }
      if(fileData.size > limit) {   // Kiểm tra xem kiểu file import có trùng trong mảng math không.
        $.notify("Dung lượng ảnh upload phải nhỏ hơn 1MB.", "error");
        $(this).val(null);
        return false;
      }
      
      if(typeof (FileReader) != "undefined") {
        let imagePri = $("#edit-avatar");  //Div chứa img
        imagePri.empty();   // Làm rỗng thẻ

        let fileReader = new FileReader();
        fileReader.onload = function(element) {
          $("<img>", {
            "src": element.target.result,
            "class": "imageUser",
            "id": "imageUserid",
            "alt": "avatar"
          }).appendTo(imagePri)  // Ghi đè thẻ img mới vào 
        }
        imagePri.show();   // Sự kiện hiện ảnh sau khi ghi đè 
        fileReader.readAsDataURL(fileData);
        
        let formData = new FormData();
        formData.append("profile-avatar", fileData);
        userAvatar = formData;

      } else {
        $.notify("Web Browser chưa hỗ trợ FileReader.", "error");
      }

    })
  })
}

function updateUserAvatar() {
  $.ajax({
    url: "/user/update-avatar",
    type: "PUT",
    caches: false,
    contentType: false,
    processData: false,
    data: userAvatar,
    success: function(result) {
      console.log(result);
      $(".alert-success").find("span").text(result.message);
      $(".alert-success").css("display", "block");

      $("#avatar-by-user").attr("src", result.imageSrc)  // Update avatar trên navbar

      originSrcAvatar = result.imageSrc;  // Cập nhật src mới 

      $("#button-cancel-update-info").click();
    },
    error: function(error) {
      console.log(error)
      $(".alert-errors").find("span").text(error.responseText);
      $(".alert-errors").css("display", "block");
      // Khi có lỗi sẽ tự refresh ảnh ban đầu 
      $("#button-cancel-update-info").click();
    }
  })
}

function updateUserInfo() {
  $.ajax({
    url: "/user/update-info",
    type: "PUT",
    data: userInfo,
    success: function(result) {
      console.log(result);
      $(".alert-success").find("span").text(result.message);
      $(".alert-success").css("display", "block");

      originUserInfo = Object.assign(originUserInfo, userInfo);

      $("#button-cancel-update-info").click();  // refresh dữ liệu
    },
    error: function(error) {
      console.log(error)
      $(".alert-errors").find("span").text(error.responseText);
      $(".alert-errors").css("display", "block");
      // Khi có lỗi sẽ tự refresh ảnh ban đầu 
      $("#button-cancel-update-info").click();
    }
  })
}

$(document).ready(function() {
  updateAvatar();
  originUserInfo = {
    username: $('#edit-username').val(),
    phone: $('#input-phone-update').val(),
    address: $('#edit-address-update').val(),
    gender: $('#edit-gender-male').is(":checked") ? $('#edit-gender-male').is(":checked") : $('#edit-gender-female').is(":checked")
  }
  originSrcAvatar = $('#imageUserid').attr("src");
  $("#button-update-info").bind("click", function() {
    if($.isEmptyObject(userInfo) && !userAvatar) {
      $.notify("Bạn phải thay đổi thông tin trước khi cập nhật.", "error");
      return false;
    }
    if(userAvatar){
      updateUserAvatar();
    }
    if(!$.isEmptyObject(userInfo)) {
      updateUserInfo();
    }
    // console.log(userAvatar)
    // console.log(userInfo)
  })

  $("#button-cancel-update-info").bind("click", function() {
    userAvatar = null;
    userInfo = {};
    $('#imageUserid').attr("src", originSrcAvatar);
    $('#edit-username').val(originUserInfo.username);
    $('#input-phone-update').val(originUserInfo.phone);
    $('#edit-address-update').val(originUserInfo.address);
    (originUserInfo.gender === "male") ? $('#edit-gender-male').click() : $('#edit-gender-female').click()
  })
})
