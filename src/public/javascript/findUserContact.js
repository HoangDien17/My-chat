
function findUserContact() {
  let keyword = $("#input-keyword").val();
  $.get(`/search-user/${keyword}`, function(contacts) {
    // $("#px-3").html(data)
    console.log(contacts)
  })
}

function getListFriend() {
  // let currentId = $(".btn-list-friend").attr("data-id");
  // $.ajax({
  //   type: "GET",
  //   url: "/list-friend"
  // })
  $.get("/list-friend")
}

$(document).ready(function(){
  $(".button-find-user").bind("click", findUserContact)

  $(".btn-list-friend").bind("click", getListFriend)  // Get list friend
})