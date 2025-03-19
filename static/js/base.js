document.querySelectorAll('.is-valid').forEach(function (element) {
    element.classList.remove('is-valid');
});

var datatableTranslations = {
  info: gettext("Showing _START_ to _END_ of _TOTAL_ entries"),
  lengthMenu: gettext("_MENU_ entries per page"),
};


// initialize all tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl, {delay:200})
})

$(document).ready(function () {
  $('.create_so_declaration').on( "click", function() {
    var $popup = $("#create_so_declaration");
    var popup_url = '/securityobjectives/create';

    $(".modal-dialog", $popup).load(popup_url, function () {
        $popup.modal("show");
    });
  });

  $('.import_so_declaration').on( "click", function() {
    var $popup = $("#import_so_declaration");
    var popup_url = '/securityobjectives/import';

    $(".modal-dialog", $popup).load(popup_url, function () {
        $popup.modal("show");
    });
  });
})
