function loadRequestAddContact () {
  $(".add-new-people").bind("click", function() {
    $.get("/load-request-contact", function(data) {
      let allRender = ''
      data.forEach(item => {
        let infoRequest = ` <div class="User-Request-Border" data-id="${item._id}">
                              <div class="infor-user-request">
                                <img src="/img/avatar/${item.avatar}" alt="">
                                <h6>${item.username}</h6>
                              </div>
                              <div class="button-request-handling">
                                <button type="button" class="btn btn-danger btn-destroy-request-contact btn-design" id="btn-destroy-request-contact" data-id="${item._id}">Hủy yêu cầu</button>
                              </div>
                            </div> `
        allRender += infoRequest
      });
      $(".load-all-request-contact").html(allRender);
      removeRequestTwo();
    })
  })
}

$(document).ready(function() {
  loadRequestAddContact();
})
