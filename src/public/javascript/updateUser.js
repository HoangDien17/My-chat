
let userAvatar = null;
let userInfo = {};
let originSrcAvatar = null

function updateAvatar() {
  $('#edit-username').bind("change", function(){
    userInfo.username = $(this).val()
  });

  $('#input-phone-update').bind("change", function(){
    userInfo.telephone = $(this).val()
  });

  $('#edit-gender-male').bind("click", function(){
    userInfo.gender = $(this).val()
  });

  $('#edit-gender-female').bind("click", function(){
    userInfo.gender = $(this).val()
  });

  $('#edit-address-update').bind("change", function(){
    userInfo.address = $(this).val()
  });

  $('#button-update-avatar').click(function() {
    $('#profileAvatarPicker').click()
    $('#profileAvatarPicker').bind("change", function(){
      let fileData = $(this).prop("files")[0];
      let math = ["image/png", "image/jpg", "image/jpeg"];
      let limit = 1048576 // 1mb
      
      // if($.inArray(fileData.type, math) == -1) {   // Kiểm tra xem kiểu file import có trùng trong mảng math không.
      //   $.notify("Kiểu file không hợp lệ, chỉ chấp nhận jpg, png.", "error");
      //   console.log(fileData.type);
      //   $(this).val(null);
      //   return false;
      // }
      // if(fileData.size > limit) {   // Kiểm tra xem kiểu file import có trùng trong mảng math không.
      //   $.notify("Dung lượng ảnh upload phải nhỏ hơn 1MB.", "error");
      //   $(this).val(null);
      //   return false;
      // }
      
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

$(document).ready(function() {
  updateAvatar();
  originSrcAvatar = $('#imageUserid').attr("src")
  $("#button-update-info").bind("click", function() {
    if($.isEmptyObject(userInfo) && !userAvatar) {
      $.notify("Bạn phải thay đổi thông tin trước khi cập nhật.", "error");
      return false;
    }
    $.ajax({
      url: "/user/update-avatar",
      type: "PUT",
      caches: false,
      contentType: false,
      processData: false,
      data: userAvatar,
      success: function(resolve) {
        //
      },
      error: function(reject) {
        //
      }
    })

    // console.log(userAvatar)
    // console.log(userInfo)
  })

  $("#button-cancel-update-info").bind("click", function() {
    userAvatar = null;
    userInfo = {};
    $('#imageUserid').attr("src", originSrcAvatar);
  })
})
