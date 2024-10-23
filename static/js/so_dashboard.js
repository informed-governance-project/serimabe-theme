$(document).ready(function () {
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
