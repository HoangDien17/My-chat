
function addContact() {
  $('.add-contact-someone').bind("click", function() {
    let targetId = $(this).data("uid");
    $.post("/add-contact", {uid: targetId})
    .done(function(data) {
      if(data.success) {
        $('#px-3').find(`button.add-contact-someone[data-uid = ${targetId}]`).hide();
        $('#px-3').find(`button.destroy-contact-someone[data-uid = ${targetId}]`).css("display", "inline-block");
        increaseNumberNoti("number-noti-confirm");
      }
    })
  })
}