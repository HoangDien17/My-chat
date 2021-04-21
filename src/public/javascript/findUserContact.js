
function findUserContact() {
  let keyword = $("#input-keyword").val();
  $.get(`/search-user/${keyword}`)
  // $.ajax({
  //   url: "/search-contact",
  //   type: "POST",
  //   data: {keyword: keyword},
  //   success: function(result) {
  //     console.log("Successes!");
  //   }
  // })
}

$(document).ready(function(){
  $(".button-find-user").bind("click", findUserContact)
})