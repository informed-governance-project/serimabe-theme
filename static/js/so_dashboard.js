$(document).ready(function () {
  $('#securityobjectives-table').DataTable({
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
        type: 'num'
      },
      {
        targets: 5,
        orderable: true,
        type: 'num',
      },
      {
        targets: 6,
        orderable: true,
        type: 'string-utf8'
      },
      {
        targets: 7,
        orderable: false,
      },
    ]
  });

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
})
