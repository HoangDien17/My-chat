$(document).ready(function () {
  $(".info-contact-user").bind("click", function () {
    let contactId = $(this).data("id");
    $.ajax({
      url: "/info-contact",
      type: "POST",
      data: { id: contactId },
      success: function (user) {
        let infoContact = `
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Thông tin tài khoản</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="information-user">
                <div class="row1">
                  <img src="/img/Background-default.jpg" alt="">
                </div>
                <input type="file" name="profile-avatar" id="profileAvatarPicker" class="inputfile" style="display: none;">
                <div class="avatar-update">
                  <div class="edit-avatar" id="edit-avatar">
                    <img src="/img/avatar/${user.avatar}" alt="avatar" class="imageUser" id="imageUserid">
                  </div>
                </div>
                <div class="username-update">
                  <h6>${user.username}</h6>
                </div>
                <div class="row2">
                  <div class="telephone-update">
                    <label for="phone"><strong>Số điện thoại: </strong></label>
                    <h6 class="input-update" id="show-phone">${user.phone}</h6>
                  </div>
                  <div class="gender-update">
                    <label for=""><strong>Giới tính: </strong></label>
                    <input type="radio" value="male" name="gender" id="edit-gender-male" {{isChecked ${user.gender} "male" }}>
                    Nam
                    <input type="radio" value="female" name="gender" id="edit-gender-female" {{isChecked ${user.gender} "female"
                      }}> Nữ
                  </div>
                  <div class="address-update">
                    <label for="address"><strong>Địa chỉ: </strong></label>
                    <p class="input-update" id="edit-address-update">${user.address}</p>
                  </div>
                </div>
              </div>
            </div>
            <hr>
          </div>
        </div>`

        $("#information-contact").html(infoContact);
      }
    })
  });

})