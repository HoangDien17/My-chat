
function findUserContact() {
  let keyword = $("#input-keyword").val();
  $.get(`/search-user/${keyword}`)
}

$(document).ready(function(){
  $(".button-find-user").bind("click", findUserContact)
})