function decreaseNumberNoti (className) {
  let numberNoti = $(`.${className}`).text();
  numberNoti-=1;
  if(numberNoti === 0) {
    $(`.${className}`).css("display", "none").html("")
  }
  $(`.${className}`).html(`${numberNoti}`);
};

function increaseNumberNoti (className) {
  let numberNoti = +$(`.${className}`).text();
  numberNoti+=1;
  if(numberNoti === 0) {
    $(`.${className}`).css("display", "none").html("")
  }
  $(`.${className}`).css("display", "inline-block").html(`${numberNoti}`);
};
