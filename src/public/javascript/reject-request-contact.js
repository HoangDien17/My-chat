
function rejectRequestContact () {
  $(".btn-cancel-request-contact").bind("click", function () {
    let contactId  = $(this).data("id");
    console.log(contactId);
  })

}

