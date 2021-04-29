
function addContact() {
  $('.add-contact-someone').bind("click", function() {
    let targetId = $(this).data("uid");
    $.post("/add-contact", {uid: targetId})
    .done(function(data) {
      if(data.success) {
        $('#px-3').find(`button.add-contact-someone[data-uid = ${targetId}]`).hide();
        $('#px-3').find(`button.destroy-contact-someone[data-uid = ${targetId}]`).css("display", "inline-block");
        increaseNumberNoti("number-noti-confirm");
        socket.emit("add-new-contact", {contactId: targetId});
      }
    })
  })
};

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
  
  increaseNumberNoti("badge-notification-add-contact");
  increaseNumberNoti("notification-message-badge");
  increaseNumberNoti("number-noti-sent");
})