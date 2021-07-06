
function findUserContact() {
  let render = "";
  let keyword = $("#input-keyword").val();
  $.ajax({
    url: "/search-user",
    type: "POST",
    data: { keyword: keyword },
    success: function (data) {
      // $('#px-3').html($(data).find('#px-3')); 
      data.forEach(item => {
        render += `<div class="card card-search-contact" data-id="${item._id}">`
        render += `<img class="card-img-top" src="/img/avatar/${item.avatar}" alt="Card image cap">`
        render += `<div class="card-body" style="padding-bottom: 10px;">`
        render += `<h5 class="card-title">${item.username}</h5>`
        render += `<p class="card-title">${item.address}</p>`
        render += `<button type="button" class="btn btn-primary add-contact-someone" data-uid="${item._id}">Thêm bạn bè</button>`
        render += `<button type="button" style="display: none" class="btn btn-danger destroy-contact-someone" data-uid="${item._id}">Hủy yêu cầu</button>`
        render += `</div>`
        render += `</div>`
        $('#px-3').html(render);

        // Call add-contact
        addContact();

        // Call remove request contact
        removeRequestOne();

      })
    }
  })
};

function showContent(classButtonShow, idContentShow, idContentHide1, idContentHide2) {
  $(`${classButtonShow}`).click(function () {
    $(`${idContentShow}`).attr("style", "display: block")
    $(`${idContentHide1}`).attr("style", "display: none")
    $(`${idContentHide2}`).attr("style", "display: none")
  })
}

//function delete friend
function deleteFriend() {
  $(".btn-delete-contact").unbind("click").on("click", function () {
    let idFriend = $(this).data("id");
    $.confirm({
      title: 'Thông báo',
      content: 'Bạn có muốn xóa kết bạn ?',
      buttons: {
        "Đồng ý": function () {
          console.log(idFriend)
          $.ajax({
            type: "DELETE",
            url: "/delete-friend",
            data: { idDelete: idFriend }
          }).done(function (data) {
            if (data.success) {
              $("ul.list-friend-ul").find(`li.list-friend-li[data-id = ${idFriend}]`).remove();
              $.notify("Hủy kết bạn thành công.", "success");
              socket.emit("delete-contact", { contactId: idFriend });
              decreaseNumberNoti("notification-list-friend-contact");
            }
          })
        },
        "Hủy": function () {
          $.notify("Dừng việc hủy kết bạn !", "warn");
        },
      }
    });
  });
}

// Xử lý notification chưa đọc 
 function isRead () {
   $("div.big-border").bind("click", function() {
     let confirmId = $(this).data("id");
     $.ajax({
       type: "PUT",
       url: "/ajax/isRead",
       data: {confirmId: confirmId}
     }).done(function(data) {
       $(".message-all").find(`div.big-border[data-id = ${confirmId}]`).find("div.content-notifi").css("color", "black")
       decreaseNumberNoti("badge-notification-add-contact");
       decreaseNumberNoti("notification-message-badge");
       decreaseNumberNoti("number-noti-confirm")
     })
   })
 }

// Client lắng nghe theo sự kiện response-delete-contact
socket.on("response-delete-contact", function(userContact) {
  $("ul.list-friend-ul").find(`li.list-friend-li[data-id = ${userContact.id}]`).remove();
  decreaseNumberNoti("notification-list-friend-contact");
})

$(document).ready(function () {
  $(".button-find-user").bind("click", findUserContact);
  $("#input-keyword").bind("keypress", findUserContact);
  // $(".btn-list-friend").bind("click", showListFriend);
  deleteFriend();
  isRead();

  showContent(".btn-list-friend", "#list-friend-id", "#notification-id", "#content-chat-id");
  showContent(".btn-notification", "#notification-id", "#list-friend-id", "#content-chat-id");
});

