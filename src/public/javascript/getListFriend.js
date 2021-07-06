
function resetCheckbox() {
  $('.cancel-get-list-contact').bind("click", function () {
    $('input.form-check-input').prop('checked', false)
  })
}

$(document).ready(function() {
  resetCheckbox();
})