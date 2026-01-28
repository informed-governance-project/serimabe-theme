document.addEventListener('DOMContentLoaded', function() {
  const acceptId = JSON.parse(
    $("#acceptId-data").text()
  );
  let termsModal = new bootstrap.Modal(document.getElementById('termsModal'));
  let checkbox = document.getElementById(acceptId);
  termsModal.show();
  if (checkbox) {
    checkbox.focus();
  }
});