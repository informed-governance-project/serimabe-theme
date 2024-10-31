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
        type: 'string'
      },
      {
        targets: 3,
        orderable: true,
        type: 'string'
      },
      {
        targets: 4,
        orderable: true,
        type: 'string'
      },
      {
        targets: 5,
        orderable: true,
      },
      {
        targets: 6,
        orderable: true,
        type: 'string'
      },
      {
        targets: 7,
        orderable: false,
      },
    ]
  });

  $('.delete_so_declaration').on( "click", function() {
    let $this = $(this);
    let modalDeleteButton = $("#modal-delete-declaration-button");
    let deleteUrlBase = $this.data('delete-url');
    let standardAnswerId = $this.data('standard-answer-id');
    let deleteUrl = deleteUrlBase.replace('0', standardAnswerId);
    modalDeleteButton.attr('href', deleteUrl);
  });

  $('.copy_so_declaration').on( "click", function() {
    let $this = $(this);
    let standardAnswerId = $this.data('standard-answer-id');
    let $popup = $("#copy_so_declaration");
    let popup_url = `/securityobjectives/copy/${standardAnswerId}`;
  
    $(".modal-dialog", $popup).load(popup_url, function () {
        $popup.modal("show");
    });
  });
})
