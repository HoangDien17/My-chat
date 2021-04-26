function decreaseNumberNoti (className) {
  let numberNoti = $(`.${className}`).text();
  numberNoti-=1;
  if(numberNoti === 0) {
    $(`.${className}`).html("")
  }
  $(`.${className}`).html(`${numberNoti}`);
};

function increaseNumberNoti (className) {
  let numberNoti = +$(`.${className}`).text();
  numberNoti+=1;
  if(numberNoti === 0) {
    $(`.${className}`).html("")
  }
  $(`.${className}`).html(`${numberNoti}`);
};
