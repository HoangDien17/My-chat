
function addContact() {
  $('.add-contact-someone').bind("click", function() {
    let targetId = $(this).data("uid");
    $.post("/add-contact", {uid: targetId})
    .done(function(data) {
      if(data.success) {
        $('#px-3').find(`button.add-contact-someone[data-uid = ${targetId}]`).hide();
        $('#px-3').find(`button.destroy-contact-someone[data-uid = ${targetId}]`).css("display", "inline-block");
        increaseNumberNoti("number-noti-confirm");
        socket.emit("add-new-contact", {contactId: targetId});  // Client gửi dữ liệu lên server

        let infoUserContact = ` <div class="User-Request-Border" data-id="${data.infoContact._id}">
                                  <div class="infor-user-request">
                                    <img src="/img/avatar/${data.infoContact.avatar}" alt="">
                                    <h6>${data.infoContact.username}</h6>
                                  </div>
                                  <div class="button-request-handling">
                                    <button type="button" class="btn btn-danger btn-destroy-request-contact btn-design" id="btn-destroy-request-contact" data-id="${data.infoContact._id}">Hủy yêu cầu</button>
                                  </div>
                                </div> `
        $(".load-all-request-contact").prepend(infoUserContact);
        removeRequestTwo();
      }
    })
  })
};

// Client lắng nghe server
socket.on("response-add-new-contact", function(user) {
  let noti = `<div class="big-border" data-id="${user.id}">
                <div class="avatar-notification">
                  <img src="/img/avatar/${user.avatar}" alt="avatar">
                </div>
                <div class="content-notifi">
                  <strong>${user.username}</strong> đã gửi cho bạn một lời mời kết bạn!
                </div>
              </div>`
  $(".message-all").prepend(noti);  //đẩy nội dung mới nhất lên trên, cũ xuống dưới
  
  let infoUserContact = `<div class="User-Request-Border" data-id="${user.id}">
                            <div class="infor-user-request">
                              <img src="/img/avatar/${user.avatar}" alt="avatar">
                              <h6>${user.username}</h6>
                            </div>
                            <div class="button-request-handling">
                              <button type="button" class="btn btn-primary accept-request-contact btn-design" id="accept-request-contact" data-id="${user.id}" >Đồng ý</button>
                              <button type="button" class="btn btn-cancel-request-contact" id="btn-cancel-request-contact" data-id="${user.id}"><i class="fas fa-times-circle"></i></button>
                            </div>
                          </div>`
  $(".content-request-contact").prepend(infoUserContact);


  increaseNumberNoti("badge-notification-add-contact");
  increaseNumberNoti("notification-message-badge");
  increaseNumberNoti("number-noti-sent");
  addToFriend();
  rejectRequestContact();
});
