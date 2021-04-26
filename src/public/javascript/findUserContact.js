var idFriend = $(".list-friend-li").data("id");

function findUserContact() {
  let render = "";
  let keyword = $("#input-keyword").val();
  $.ajax({
    url: "/search-user",
    type: "POST",
    data: {keyword: keyword},
    success: function(data) {
      // $('#px-3').html($(data).find('#px-3')); 
      data.forEach(item => {
      render += `<div class="card card-search-contact">`
      render += `<img class="card-img-top" src="/img/avatar/avatar-default.jpg" alt="Card image cap">`
      render += `<div class="card-body" style="padding-bottom: 10px;">`
      render += `<h5 class="card-title">${item.username}</h5>`
      render += `<p class="card-title">${item.address}</p>`
      render += `<a href="#" class="btn btn-primary">Thêm bạn bè</a>`
      render += `</div>`
      render += `</div>`
      $('#px-3').html(render)
      })
    }
  })
}

function showListFriend() {
  $("#list-friend-id").attr("style", { display: "block" })
}

function alertUnfriend() {
  $.confirm({
    title: 'Thông báo',
    content: 'Bạn có muốn xóa kết bạn ?',
    buttons: {
      "Đồng ý": function () {
        $.ajax({
          type: "PUT",
          url: `/delete-friend/${idFriend}`
        })
        $.notify("Hủy kết bạn thành công.", "success");
      },
      "Hủy": function () {
        $.notify("Dừng việc hủy kết bạn !", "warn");
      },
    }
  });

}

$(document).ready(function () {
  $(".button-find-user").bind("click", findUserContact);
  $("#input-keyword").bind("keypress", findUserContact);
  $(".btn-list-friend").bind("click", showListFriend);
  $(".btn-delete-contact").bind("click", alertUnfriend);
})