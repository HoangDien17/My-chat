
function rejectRequestContact () {
  $(".btn-cancel-request-contact").unbind("click").on("click", function() {
    let contactId  = $(this).data("id");
    $.ajax({
      url: "/reject-request-contact",
      type: "DELETE",
      data: {id: contactId},
      success: function(data) {
        if(data.success) {
          $(".content-request-contact").find(`div.User-Request-Border[data-id = ${contactId}]`).remove();
          $(".message-all").find(`div.big-border[data-id = ${contactId}]`).remove();
          socket.emit("remove-request-contact", {contactId: contactId});
          decreaseNumberNoti("badge-notification-add-contact");
          decreaseNumberNoti("notification-message-badge");
          decreaseNumberNoti("number-noti-sent");
        }
      }
    })
  })
}

// Client lắng nghe sự kiện response-remove-request-contact
socket.on("response-remove-request-contact", function(user) {
  $('#px-3').find(`button.destroy-contact-someone[data-uid = ${user.id}]`).hide();
  $('#px-3').find(`button.add-contact-someone[data-uid = ${user.id}]`).css("display", "inline-block");
  decreaseNumberNoti("number-noti-confirm");
})


$(document).ready(function() {
  rejectRequestContact();
})
