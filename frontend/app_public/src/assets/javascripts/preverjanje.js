$('#dodajKomentar').submit(function() {
  $('.alert.alert-danger').hide();
  if (!$('#naziv').val() || !$('#ocena').val() || !$('#komentar').val()) {
    if ($('.alert.alert-danger').length) {
      $('.alert.alert-danger').show();
    } else {
      $(this).prepend('<div class="alert alert-danger">Prosim izpolnite vsa polja!</div>');
    }
    return false;
  }
});