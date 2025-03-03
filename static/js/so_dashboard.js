$(document).ready(function () {
  let table = $('#securityobjectives-table').DataTable({
    dom: 'rt<"table_controls mt-3 bottom d-flex justify-content-between lh-1 small"lip><"clear">',
    language: datatableTranslations,
    autoWidth: false,
    paging: true,
    searching: false,
    order: [[0, 'desc']],
    columnDefs: [
      {
        targets: 0,
        type: 'date',
      },
      {
        targets: 1,
        type: 'date',
      },
      {
        targets: 2,
        orderable: true,
        type: 'string-utf8'
      },
      {
        targets: 3,
        orderable: true,
        type: 'string-utf8'
      },
      {
        targets: 4,
        orderable: true,
        type: 'string-utf8'
      },
      {
        targets: 5,
        orderable: true,
        type: 'num'
      },
      {
        targets: 6,
        orderable: true,
        type: 'num',
      },
      {
        targets: 7,
        orderable: true,
        type: 'string-utf8'
      },
      {
        targets: 8,
        orderable: false,
      },
    ]
  });

  displayPagination(table);

  $(document).on("click", ".delete_so_declaration", function () {
    let $this = $(this);
    let modalDeleteButton = $("#modal-delete-declaration-button");
    let deleteUrlBase = $this.data('delete-url');
    let standardAnswerId = $this.data('standard-answer-id');
    let deleteUrl = deleteUrlBase.replace('0', standardAnswerId);
    modalDeleteButton.attr('href', deleteUrl);
  });

  $(document).on("click", ".copy_so_declaration", function () {
    let $this = $(this);
    let standardAnswerId = $this.data('standard-answer-id');
    let $popup = $("#copy_so_declaration");
    let popup_url = `/securityobjectives/copy/${standardAnswerId}`;

    $(".modal-dialog", $popup).load(popup_url, function () {
      $popup.modal("show");
    });
  });

  $(document).on("click", ".review_comment_so_declaration", function () {
    let $this = $(this);
    let standardAnswerId = $this.data('standard-answer-id');
    let $popup = $("#review_comment_so_declaration");
    let popup_url = `/securityobjectives/review_comment/${standardAnswerId}`;
    $popup.find(".modal-dialog").empty();
    $(".modal-dialog", $popup).load(popup_url, function () {
      $popup.modal("show");
      $("#id_deadline").datepicker({
        showOptions: { direction: "up" },
        minDate: new Date(),
      });
    });

  });

  $(document).on("click", '.so_access_log', function () {
    var $popup = $("#so_access_log");
    var popup_url = 'access_log/' + $(this).data("standard-answer-id");

    $(".modal-dialog", $popup).load(popup_url, function () {
      $popup.modal("show");
    });
  });
})

function displayPagination(table) {
  let rowCount = table.data().length;
  if (rowCount <= 10) $('.table_controls').addClass("d-none");
}