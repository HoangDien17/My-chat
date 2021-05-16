$(document).ready(function(){
  $("select.check-status-account").change(function(){
      var selectedStatus = $(this).children("option:selected").val();
      switch (selectedStatus) {
        case "busy":
          $('.check-status').css("background", "red");
          break;
        case "offline":
          $('.check-status').css("background", "gray");
          break;
        default: $('.check-status').css("background", "green");
          break;
      }
  });
});