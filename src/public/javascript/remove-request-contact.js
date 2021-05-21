
function removeRequestOne() {
  $('.destroy-contact-someone').bind("click", function() {
    let targetId = $(this).data("uid");
    $.ajax({
      url: "/remove-request",
      type: "DELETE",
      data: {uid: targetId},
      success: function(data) {
        if(data.success) {
          $('#px-3').find(`button.destroy-contact-someone[data-uid = ${targetId}]`).hide();
          $('#px-3').find(`button.add-contact-someone[data-uid = ${targetId}]`).css("display", "inline-block");
          decreaseNumberNoti("number-noti-confirm");
          $(".load-all-request-contact").find(`div.User-Request-Border[data-id = ${targetId}]`).remove();
          socket.emit("remove-request-contact", {contactId: targetId});
        }
      }
    })
  })
}

function removeRequestTwo() {
  $(".btn-destroy-request-contact").unbind("click").on("click", function() {
    let targetId = $(this).data("id");
    $.ajax({
      url: "/remove-request",
      type: "DELETE",
      data: {uid: targetId},
      success: function(data) {
        if(data.success) {
          $('#px-3').find(`button.destroy-contact-someone[data-uid = ${targetId}]`).hide();
          $('#px-3').find(`button.add-contact-someone[data-uid = ${targetId}]`).css("display", "inline-block");
          decreaseNumberNoti("number-noti-confirm");
          $(".load-all-request-contact").find(`div.User-Request-Border[data-id = ${targetId}]`).remove();
          socket.emit("remove-request-contact", {contactId: targetId});
        }
      }
    })
  })
}   



socket.on("response-remove-request-contact", function(user) {
  $(".message-all").find(`div[data-id = ${user.id}]`).remove();
  
  decreaseNumberNoti("badge-notification-add-contact");
  decreaseNumberNoti("notification-message-badge");
  decreaseNumberNoti("number-noti-sent");
})