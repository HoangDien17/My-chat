/* Add to list friend */
function addToFriend() {
  $(".accept-request-contact").unbind("click").on("click", function () {
    let targetId = $(this).data("id");
    $.ajax({
      url: "/handle-request",
      type: "PUT",
      data: { id: targetId },
    }).done(function (data) {
      if (data.success) {
        // Client gửi dữ liệu lên server với sự kiện add-to-friend
        socket.emit("add-to-friend", { contactId: targetId });

        let userRender = `
                          <li class="list-friend-li" data-id="${data.user._id}" id="list-friend-li">
                            <div class="image-contact-item">
                              <img id="image-item" src="/img/avatar/${data.user.avatar}" alt="image">
                              <h6 class="p-username">${data.user.username}</h6>
                            </div>
                            <div class="more-option">
                              <div class="dropdown">
                                <button class="btn btn-outline " type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                  aria-haspopup="true" aria-expanded="false">
                                  <i class="fas fa-ellipsis-h"></i>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                  <button class="dropdown-item info-contact-user" data-id="${data.user._id}" type="button" id="button-user" data-toggle="modal" data-target="#information-contact">Xem thông tin</button>
                                  <hr style="witch: 90%">
                                  <button class="dropdown-item btn-delete-contact" type="button" data-id="${data.user._id}" id="btn-delete-contact">Xóa bạn</button>
                                </div>
                              </div>
                            </div>
                            <div class="status-contact-item"></div>
                          </li>`
        // let userContact = userItemContact.get(0).outerHTML();                     
        $(".list-friend-ul").prepend(userRender);

        // Call function delete friend
        deleteFriend();

        increaseNumberNoti("notification-list-friend-contact");
        decreaseNumberNoti("number-noti-sent");
        decreaseNumberNoti("notification-message-badge");
        decreaseNumberNoti("badge-notification-add-contact");
        $(".content-request-contact").find(`div[data-id = ${targetId}]`).remove();
        $(".message-all").find(`div[data-id = ${targetId}]`).remove();
      }
    });
  });
}

// Client lắng nghe sự kiện response-add-to-friend
socket.on("response-add-to-friend", function (userInfo) {
  let notiNewContact = `<div class="big-border" data-id="${userInfo.id}">
                <div class="avatar-notification">
                  <img src="/img/avatar/${userInfo.avatar}" alt="avatar">
                </div>
                <div class="content-notifi">
                  <strong>${userInfo.username}</strong> đã chấp nhận lời kết bạn!
                </div>
              </div>`
  $(".message-all").prepend(notiNewContact);  //đẩy nội dung mới nhất lên trên, cũ xuống dưới
  decreaseNumberNoti("number-noti-confirm");
  increaseNumberNoti("number-noti-list-friend");
  increaseNumberNoti("notification-list-friend-contact");
  increaseNumberNoti("notification-message-badge");
  $(".load-all-request-contact").find(`div.User-Request-Border[data-id = ${userInfo.id}]`).remove();
  $(".px-3").find(`div.card-search-contact[data-id = ${userInfo.id}]`).remove();

  // Thêm vào danh bạ
  let itemToFriend = `
                      <li class="list-friend-li" data-id="${userInfo.id}" id="list-friend-li">
                          <div class="image-contact-item">
                            <img id="image-item" src="/img/avatar/${userInfo.avatar}" alt="image">
                            <h6 class="p-username">${userInfo.username}</h6>
                          </div>
                          <div class="more-option">
                            <div class="dropdown">
                              <button class="btn btn-outline " type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-ellipsis-h"></i>
                              </button>
                              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button class="dropdown-item info-contact-user" data-id="${userInfo.id}" type="button" id="button-user" data-toggle="modal" data-target="#information-contact">Xem thông tin</button>
                                <hr style="witch: 90%">
                                <button class="dropdown-item btn-delete-contact" type="button" data-id="${userInfo.id}" id="btn-delete-contact">Xóa bạn</button>
                              </div>
                            </div>
                          </div>
                          <div class="status-contact-item"></div>
                        </li>`
  $("ul.list-friend-ul").append(itemToFriend);
  // Call function remove request contact
  deleteFriend();
});

$(document).ready(function () {
  addToFriend();
})