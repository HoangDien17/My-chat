/* Add to list friend */
  function addToFriend() {
    $(".accept-request-contact").bind("click", function() {
      let targetId = $(this).data("id");
      $.ajax({
        url: "/handle-request",
        type: "PUT",
        data: {id: targetId},
        success: function(data) {
          // Client gửi dữ liệu lên server với sự kiện add-to-friend
        socket.emit("add-to-friend", {contactId: targetId});
        }
      });
      let userItemContact = $(".content-request-contact").find(`div.User-Request-Border[data-id = ${targetId}]`);
      $(userItemContact).find("div.button-request-handling").remove();
      $(userItemContact).append(`<div class="more-option">
                                <div class="dropdown">
                                  <button class="btn btn-outline " type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-ellipsis-h"></i>
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <button class="dropdown-item" type="button" id="button-user" data-toggle="modal" data-target="#information-contact">Xem thông tin</button>
                                    <hr style="witch: 90%">
                                    <button class="dropdown-item btn-delete-contact" type="button" id="btn-delete-contact">Xóa bạn</button>
                                  </div>
                                </div>
                              </div>`);
      // let userContact = userItemContact.get(0).outerHTML();                     
      $(".list-friend-ul").prepend(userItemContact);


      $(".content-request-contact").find(`div[data-id = ${targetId}]`).remove();
      $(".message-all").find(`div[data-id = ${targetId}]`).remove();
    });
  }

// Client lắng nghe sự kiện response-add-to-friend
socket.on("response-add-to-friend", function(userInfo) {
  let notiNewContact = `<div class="big-border" data-id="${userInfo.id}">
                <div class="avatar-notification">
                  <img src="/img/avatar/${userInfo.avatar}" alt="avatar">
                </div>
                <div class="content-notifi">
                  <strong>${userInfo.username}</strong> đã chấp nhận lời kết bạn!
                </div>
              </div>`
  $(".message-all").prepend(notiNewContact);  //đẩy nội dung mới nhất lên trên, cũ xuống dưới
  increaseNumberNoti("number-noti-list-friend");
  increaseNumberNoti("notification-list-friend-contact");
  increaseNumberNoti("notification-message-badge")
});

$(document).ready(function() {
  addToFriend();
})